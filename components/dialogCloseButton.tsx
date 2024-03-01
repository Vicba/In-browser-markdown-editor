import { useState } from "react"
import { useSelectedDoc } from "@/context/DocContext"
import { Copy, Plus } from "lucide-react"
import { v4 as uuidv4 } from "uuid"

import { default_mk_docs } from "@/lib/utils"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function DialogCloseButton() {
  const [inputValue, setInputValue] = useState<string>("Untitled.md")
  const [documents, setDocuments] = useLocalStorage("mk-docs", default_mk_docs)
  const { setSelectedDoc } = useSelectedDoc()

  const handleCreateNewDocument = (file_name?: string) => {
    const newDoc = {
      doc_id: uuidv4(),
      createdAt: new Date().toLocaleDateString("en-US"),
      file_name: file_name ?? "Untitled.md",
      content: "",
    }
    setDocuments([...documents, newDoc])
    setSelectedDoc(newDoc)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="flex flex-row gap-3">
          <Plus size={16} />
          New Document
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Document</DialogTitle>
          <DialogDescription>Document Name</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              type="button"
              variant="default"
              className="flex flex-row gap-3 "
              onClick={() => handleCreateNewDocument(inputValue)}
            >
              <Plus size={16} />
              Create
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
