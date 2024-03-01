import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { v4 as uuidv4 } from "uuid"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const default_mk_docs = [
  {
    doc_id: uuidv4(),
    createdAt: "2022-04-01",
    file_name: "welcome.md",
    content:
      "# Welcome to Markdown\n\nMarkdown is a lightweight markup language...",
  },
  {
    doc_id: uuidv4(),
    createdAt: "2022-05-01",
    file_name: "Untitled.md",
    content: "",
  },
]
