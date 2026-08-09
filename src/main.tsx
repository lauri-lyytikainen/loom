import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Layout from "./Layout";
import { SettingsProvider } from "@/lib/settings-context";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SettingsProvider>
      <Layout>
        <App />
      </Layout>
    </SettingsProvider>
  </React.StrictMode>,
);
