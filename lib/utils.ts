import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const default_mk_docs = [
  {
    createdAt: "04-01-2022",
    file_name: "welcome.md",
    content:
      "# Welcome to Markdown\n\nMarkdown is a lightweight markup language...",
  },
  {
    createdAt: "05-01-2022",
    file_name: "Untitled.md",
    content: "",
  },
]
