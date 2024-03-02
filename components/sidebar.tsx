"use client"

import React, { useEffect, useState } from "react"
import { useSelectedDoc } from "@/context/DocContext"
import { Download, DownloadIcon, Plus } from "lucide-react"

import { doc } from "@/types/markdown_docs"
import { default_mk_docs, downloadFile } from "@/lib/utils"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { Button } from "@/components/ui/button"
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

export default function SideBar({ title }: { title: string }) {
  const [documents, setDocuments] = useLocalStorage("mk-docs", default_mk_docs)
  const { setSelectedDoc } = useSelectedDoc()

  // console.log(documents.map((doc: doc) => console.log(typeof doc.createdAt)))

  const handleDownload = (doc: doc) => {
    console.log("Download")
    const { file_name, content } = doc

    downloadFile(file_name, content)
  }

  return (
    <>
      <Sheet key={"left"}>
        <SheetTrigger className="inline-block font-bold">{title}</SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader>
            <SheetTitle className="tracking-wider pb-1">MARKDOWN</SheetTitle>
            <SheetDescription className="pb-6">
              <p className="pb-6">Create New Documents</p>
              <DialogCloseButton />
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            {documents?.map((doc: doc, idx: number) => (
              <div
                key={idx}
                className="text-white gap-4 flex flex-row items-center justify-between"
              >
                <div className="flex flex-col">
                  <SheetTrigger>
                    <h1
                      onClick={() => setSelectedDoc(doc)}
                      className="text-black text-start dark:text-white hover:underline hover:underline-offset-2 hover:cursor-pointer"
                    >
                      {doc.file_name}
                    </h1>
                  </SheetTrigger>
                  <p className="text-sm text-slate-400">{doc.createdAt}</p>
                </div>

                <DownloadIcon
                  size={20}
                  className=" text-black dark:text-slate-400 hover:text-slate-500 dark:hover:text-slate-200 hover:cursor-pointer"
                  onClick={() => handleDownload(doc)}
                />
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
