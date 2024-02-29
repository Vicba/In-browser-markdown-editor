"use client"

import React, { use, useEffect, useState } from "react"
import { Plus } from "lucide-react"

import { doc } from "@/types/markdown_docs"
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
  // const { retrievedData } = useLocalStorage("mk-docs")
  // console.log("documents", retrievedData)

  return (
    <div>
      <Sheet key={"left"}>
        <SheetTrigger className="inline-block font-bold">{title}</SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            sqdf
            {/* {retrievedData?.length} */}
            {/* {documents?.map((doc, idx: number) => (
              <div key={idx} className=" text-white gap-4">
                {doc.file_name}
              </div>
            ))} */}
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <DialogCloseButton />
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}
