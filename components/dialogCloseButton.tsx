import { useState } from "react"
import { useMarkdownContext } from "@/context/MarkdownContext"
import { Copy, PencilIcon, Plus } from "lucide-react"
import { v4 as uuidv4 } from "uuid"

import { default_mk_docs } from "@/lib/utils"
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
  const { addDoc, editNameDoc } = useMarkdownContext()

  const handleCreateNewDocument = (file_name: string) => {
    if (file_name === "") {
      alert("Please enter a file name")
      return
    }
    addDoc(file_name)
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
              {btnSubmitTxt}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
