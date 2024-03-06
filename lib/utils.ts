import { Doc } from "@/types"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { v4 as uuidv4 } from "uuid"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const default_mk_docs: Doc[] = [
  {
    doc_id: uuidv4(),
    createdAt: new Date(2024, 0, 1).toLocaleDateString("en-US"),
    file_name: "welcome.md",
    content:
      "# Welcome to Markdown\n\nMarkdown is a lightweight markup language...",
  },
  {
    doc_id: uuidv4(),
    createdAt: new Date(2024, 0, 2).toLocaleDateString("en-US"),
    file_name: "Untitled.md",
    content: "",
  },
]

export const downloadFile = (file_name: string, content: string): void => {
  const fileNameWithExtension = file_name.endsWith(".md")
    ? file_name
    : `${file_name.replace(/\./g, "_")}.md`

  // Create a Blob with the file content
  const blob = new Blob([content], { type: "text/plain" })

  // Create a link element
  const link = document.createElement("a")

  // Set the download attribute with the file name
  link.download = fileNameWithExtension

  // Create a URL for the Blob and set it as the href attribute
  link.href = URL.createObjectURL(blob)

  // Append the link to the document
  document.body.appendChild(link)

  // Trigger a click event on the link to start the download
  link.click()

  // Remove the link from the document
  document.body.removeChild(link)
}
