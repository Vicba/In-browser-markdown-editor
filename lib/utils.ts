import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const default_mk_docs = [
  {
    createdAt: new Date("2022-04-01"),
    file_name: "welcome.md",
    content:
      "# Welcome to Markdown\n\nMarkdown is a lightweight markup language...",
  },
  {
    createdAt: new Date("2022-05-01"),
    file_name: "Untitled.md",
    content: "",
  },
]
