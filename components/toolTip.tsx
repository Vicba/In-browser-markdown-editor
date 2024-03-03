import React from "react"
import { useMarkdownContext } from "@/context/MarkdownContext"
import {
  DownloadIcon,
  PencilIcon,
  SettingsIcon,
  Trash2Icon,
} from "lucide-react"

import { doc } from "@/types/markdown_docs"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { DialogCloseButton } from "./dialogCloseButton"
import { toast } from "./ui/use-toast"

type Props = {
  itemIdx: number
  handleDownload: (doc: doc) => void
  document: doc
}

export default function CustomTooltip({
  handleDownload,
  document,
  itemIdx,
}: Props) {
  const { deleteDoc } = useMarkdownContext()

  const handleDelete = (index: number) => {
    console.log("Delete", index)
    deleteDoc(index)
    toast({
      title: "Document Deleted",
      description: "Document has been deleted",
    })
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <SettingsIcon
            size={18}
            className="text-black dark:text-white cursor-pointer"
          />
        </TooltipTrigger>
        <TooltipContent className="flex flex-row gap-2">
          <DialogCloseButton
            title="Edit File Name"
            description="Type your new file name"
            defaultValue={document.file_name}
            btnSubmitTxt="Save"
            type="edit"
          />
          <DownloadIcon
            size={18}
            className="cursor-pointer"
            onClick={() => handleDownload(document)}
          />
          <Trash2Icon
            size={18}
            color="red"
            className="cursor-pointer"
            onClick={() => handleDelete(itemIdx)}
          />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
