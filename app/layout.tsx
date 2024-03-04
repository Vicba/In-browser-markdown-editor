"use client"

import "@/styles/globals.css"
import { Metadata } from "next"
import { MarkdownProvider } from "@/context/MarkdownContext"

import { siteConfig } from "@/config/site"
import { fontMono, fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { SiteHeader } from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"

const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/fotogezicht.png",
    shortcut: "/fotogezicht.png",
    apple: "/fotogezicht.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "max-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <MarkdownProvider>
              <div className="relative flex max-h-screen flex-col">
                <SiteHeader />
                {children}
                <Toaster />
              </div>
            </MarkdownProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
