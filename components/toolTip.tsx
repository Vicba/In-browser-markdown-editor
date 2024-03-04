import React from "react"
import { useMarkdownContext } from "@/context/MarkdownContext"
import { Doc } from "@/types"
import {
  DownloadIcon,
  PencilIcon,
  SettingsIcon,
  Trash2Icon,
} from "lucide-react"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { DialogCloseButton } from "./dialogCloseButton"
import { toast } from "./ui/use-toast"

type Props = {
  doc_id: string
  handleDownload: (doc: Doc) => void
  document: Doc
}

export default function CustomTooltip({
  handleDownload,
  document,
  doc_id,
}: Props) {
  const { deleteDoc } = useMarkdownContext()

  const handleDelete = (id: string) => {
    deleteDoc(id)
    toast({
      title: "Document Deleted",
      description: "Document has been deleted",
    })
  }

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger>
          <SettingsIcon
            size={18}
            className="text-black dark:text-white cursor-pointer"
          />
        </TooltipTrigger>
        <TooltipContent className="flex flex-row gap-2">
          {/* <DialogCloseButton
            title="Edit File Name"
            description="Type your new file name"
            defaultValue={document.file_name}
            btnSubmitTxt="Save"
            type="edit"
          /> */}
          <DownloadIcon
            size={18}
            className="cursor-pointer"
            onClick={() => handleDownload(document)}
          />
          <Trash2Icon
            size={18}
            color="red"
            className="cursor-pointer"
            onClick={() => handleDelete(doc_id)}
          />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
