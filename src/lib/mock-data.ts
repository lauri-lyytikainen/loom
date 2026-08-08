export type TagColor = "blue" | "red" | "amber" | "green" | "purple"

export interface Tag {
  id: string
  name: string
  color: TagColor
}

export interface Notebook {
  id: string
  name: string
  count: number
}

export interface Note {
  id: string
  title: string
  notebook: string
  tags: string[]
  updatedAt: string
  preview: string
  editorText: string
  outputText: string
}

export const tags: Tag[] = [
  { id: "science", name: "Science", color: "blue" },
  { id: "history", name: "History", color: "red" },
  { id: "exam", name: "Exam", color: "amber" },
]

export const notebooks: Notebook[] = [
  { id: "biology", name: "Biology", count: 6 },
  { id: "history", name: "History", count: 3 },
]

export const notes: Note[] = [
  {
    id: "cell-structure",
    title: "Cell Structure",
    notebook: "Biology",
    tags: ["Science", "Exam"],
    updatedAt: "2 hours ago",
    preview: "Cells are the basic building blocks of life...",
    editorText:
      "# Cell Structure\n\nCells are the basic building blocks of life.\n\nEvery organism is composed of one or more cells.\n\n## Key Organelles\n\n- Nucleus — stores genetic material\n- Mitochondria — generates energy\n- Cell Membrane — regulates transport",
    outputText:
      "Cells are the basic building blocks of life. Every organism is composed of one or more cells, which carry out the functions necessary for survival.\n\nKey Organelles\n\nNucleus — stores genetic material and controls cell activity\nMitochondria — generates energy through cellular respiration\nCell Membrane — regulates what enters and exits the cell",
  },
  {
    id: "world-war-ii",
    title: "World War II",
    notebook: "History",
    tags: ["History"],
    updatedAt: "1 day ago",
    preview: "Began in 1939 after Germany invaded Poland...",
    editorText:
      "# World War II\n\nBegan in 1939 after Germany invaded Poland.\n\n## Major Powers\n\n- Allies\n- Axis",
    outputText:
      "World War II began in 1939 after Germany invaded Poland.\n\nMajor Powers\n\nThe conflict was fought primarily between the Allied and Axis powers.",
  },
  {
    id: "cold-war",
    title: "Cold War",
    notebook: "History",
    tags: ["History"],
    updatedAt: "4 days ago",
    preview: "A period of geopolitical tension between...",
    editorText:
      "# Cold War\n\nA period of geopolitical tension between the United States and the Soviet Union.",
    outputText:
      "The Cold War was a period of geopolitical tension between the United States and the Soviet Union that lasted from roughly 1947 to 1991.",
  },
  {
    id: "photosynthesis",
    title: "Photosynthesis",
    notebook: "Biology",
    tags: ["Science"],
    updatedAt: "5 days ago",
    preview: "Plants convert light energy into chemical...",
    editorText:
      "# Photosynthesis\n\nPlants convert light energy into chemical energy.\n\n## Formula\n\n6CO2 + 6H2O -> C6H12O6 + 6O2",
    outputText:
      "Plants convert light energy into chemical energy stored in glucose, using carbon dioxide and water and releasing oxygen as a byproduct.",
  },
]

export const tagColorClasses: Record<TagColor, string> = {
  blue: "bg-blue-500",
  red: "bg-red-500",
  amber: "bg-amber-500",
  green: "bg-green-500",
  purple: "bg-purple-500",
}
