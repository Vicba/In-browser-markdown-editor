"use client"

import React, { useEffect, useState } from "react"
import { Plus } from "lucide-react"

import { doc } from "@/types/markdown_docs"
import { default_mk_docs } from "@/lib/utils"
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

  // console.log(documents.map((doc: doc) => console.log(typeof doc.createdAt)))

  return (
    <div>
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
              <div key={idx} className="text-white gap-4">
                <h1 className="text-black dark:text-white hover:underline hover:underline-offset-2 hover:cursor-pointer">
                  {doc.file_name}
                </h1>
                <p className="text-sm text-slate-400">{doc.createdAt}</p>
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
