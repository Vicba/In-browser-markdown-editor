"use client"

import React from "react"
import { useMarkdownContext } from "@/context/MarkdownContext"
import { Doc } from "@/types"
import { IndentIcon } from "lucide-react"

import { downloadFile } from "@/lib/utils"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { DialogCloseButton } from "./dialogCloseButton"
import CustomTooltip from "./toolTip"

export default function SideBar({ title }: { title: string }) {
  const { documents, selectDoc } = useMarkdownContext()

  const handleDownload = (doc: Doc) => {
    const { file_name, content } = doc
    downloadFile(file_name, content)
  }

  return (
    <Sheet key={"left"}>
      <SheetTrigger className="flex flex-row items-center gap-2 font-bold">
        <IndentIcon size={20} />
        {title}
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle className="tracking-wider pb-1">MARKDOWN</SheetTitle>
          <SheetDescription className="pb-6">
            <p className="pb-6">Create New Documents</p>
            <DialogCloseButton
              btnText="New Document"
              title="Create New Document"
              description="Document Name"
              defaultValue="Untitled.md"
              btnSubmitTxt="Create"
              type="create"
            />
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          {documents?.map((doc: Doc, idx: number) => (
            <div
              key={idx}
              className="text-white gap-4 flex flex-row items-center justify-between"
            >
              <div className="flex flex-col">
                <SheetTrigger>
                  <h1
                    onClick={() => selectDoc(doc.doc_id)}
                    className="text-black text-start dark:text-white hover:underline hover:underline-offset-2 hover:cursor-pointer"
                  >
                    {doc.file_name}
                  </h1>
                </SheetTrigger>
                <p className="text-sm text-slate-400">{doc.createdAt}</p>
              </div>

              <CustomTooltip
                document={doc}
                handleDownload={handleDownload}
                doc_id={doc.doc_id}
              />
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
