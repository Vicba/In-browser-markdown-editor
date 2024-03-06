"use client"

import Link from "next/link"
import { useMarkdownContext } from "@/context/MarkdownContext"
import { EyeIcon, EyeOffIcon, SaveIcon } from "lucide-react"

import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

import { toast } from "./ui/use-toast"

export function SiteHeader() {
  const { currentDoc, view, setView } = useMarkdownContext()

  const changeView = () => {
    setView(!view)
  }

  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-between space-x-4">
          <div className="flex flex-row gap-8 items-center ml-5">
            <div className="hidden md:block">
              {currentDoc ? currentDoc.file_name : "Untitled.md"}
            </div>
            <div onClick={changeView} className="cursor-pointer">
              {view ? <EyeIcon size={20} /> : <EyeOffIcon size={20} />}
            </div>
          </div>
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
        </div>
      </div>
    </header>
  )
}
