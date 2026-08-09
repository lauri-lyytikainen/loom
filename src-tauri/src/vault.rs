use serde::Serialize;
use std::fs;
use std::io::Write;
use std::path::Path;

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct VaultPathStatus {
    pub exists: bool,
    pub is_directory: bool,
    pub writable: bool,
}

/// Checks that `path` exists, is a directory, and is writable.
/// Writability is proven (not assumed) by attempting to create and
/// immediately remove a probe file inside it - a plain existence
/// check does not prove write access (e.g. a read-only mount or a
/// permission-denied directory still "exists").
#[tauri::command]
pub fn validate_vault_path(path: String) -> VaultPathStatus {
    let p = Path::new(&path);
    let metadata = fs::metadata(p);
    let exists = metadata.is_ok();
    let is_directory = metadata.map(|m| m.is_dir()).unwrap_or(false);

    let writable = if is_directory {
        let probe = p.join(".loom-write-test");
        match fs::File::create(&probe) {
            Ok(mut f) => {
                let ok = f.write_all(b"ok").is_ok();
                let _ = fs::remove_file(&probe);
                ok
            }
            Err(_) => false,
        }
    } else {
        false
    };

    VaultPathStatus {
        exists,
        is_directory,
        writable,
    }
}
