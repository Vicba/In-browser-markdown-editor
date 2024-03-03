"use client"

import { useState } from "react"
import Link from "next/link"
import { useMarkdownContext } from "@/context/MarkdownContext"
import { Eye, EyeIcon, EyeOffIcon, SaveIcon } from "lucide-react"

import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

import { toast } from "./ui/use-toast"

export function SiteHeader() {
  const { documents, currentDoc, saveDoc, view, setView } = useMarkdownContext()

  const save = () => {
    if (currentDoc === false) {
      alert("Please create a new document first!")
    } else {
      saveDoc(currentDoc)
      toast({ title: "Success!", description: "Your document has been saved." })
    }
  }

  const changeView = () => {
    setView(!view)
  }

  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-between space-x-4">
          <nav className="hidden sm:visible sm:flex items-center space-x-1 ml-5">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <Icons.gitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <Icons.twitter className="h-5 w-5 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
            <ThemeToggle />
          </nav>
          <div className="flex flex-row gap-8 items-center">
            {currentDoc ? documents[currentDoc].file_name : "Untitled.md"}
            <div onClick={changeView} className="cursor-pointer">
              {view ? <EyeIcon size={20} /> : <EyeOffIcon size={20} />}
            </div>
            <Button
              className="flex flex-row gap-3 text-xs sm:text-sm"
              onClick={save}
            >
              <span className="flex flex-row gap-1">
                Save <span className="hidden sm:block">Document</span>
              </span>
              <SaveIcon size={20} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
