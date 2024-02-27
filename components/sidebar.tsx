"use client"

import React from "react"
import { Plus } from "lucide-react"

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
            <div className="grid grid-cols-4 items-center gap-4">
              blablabla1
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              blablabal2
            </div>
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
