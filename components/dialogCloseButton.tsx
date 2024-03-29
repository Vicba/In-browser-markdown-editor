import { useState } from "react"
import { useMarkdownContext } from "@/context/MarkdownContext"
import { PencilIcon, Plus } from "lucide-react"

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

import { toast } from "./ui/use-toast"

type Props = {
  btnText?: string
  title: string
  description: string
  defaultValue: string
  btnSubmitTxt: string
  type: "create" | "edit"
}

export function DialogCloseButton({
  btnText,
  title,
  description,
  defaultValue,
  btnSubmitTxt,
  type,
}: Props) {
  const [inputValue, setInputValue] = useState<string>(defaultValue)
  const { addDoc, editFileName } = useMarkdownContext()

  const isValidFileName = (file_name: string): boolean => {
    const isPlainText = /^[^.]+$/.test(file_name)
    const isMarkdownFile = file_name.endsWith(".md")
    return isPlainText || isMarkdownFile
  }

  const handleCreateNewDocument = (file_name: string) => {
    if (file_name === "") {
      toast({ title: "Please enter a file name" })
      return
    }

    if (isValidFileName(file_name)) {
      addDoc(file_name)
    } else {
      toast({
        title: "Invalid file name",
        description: " Please use a valid file name.",
      })
    }
  }

  // const handleEditDocument = (file_name: string) => {
  //   if (file_name === "") {
  //     alert("Please enter a file name")
  //     return
  //   }
  //   editNameDoc(index, file_name)
  // }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {type === "edit" ? (
          <PencilIcon size={16} className="cursor-pointer" />
        ) : (
          <Button variant="default" className="flex flex-row gap-3">
            <Plus size={16} />
            {btnText}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid gap-2">
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
              {type === "create" && <Plus size={16} />}
              {btnSubmitTxt}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
