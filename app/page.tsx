"use client"

import { useState } from "react"
import Markdown from "react-markdown"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"

export default function IndexPage() {
  const [text, setText] = useState<string>("")

  return (
    <div className="container h-screen grid items-center gap-6 pb-8 pt-6 md:py-5">
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-full min-w-full rounded-lg border overflow"
      >
        <ResizablePanel defaultSize={50}>
          <Textarea
            id="markdown-editor"
            className="flex min-h-full min-w-full items-center justify-center p-6 bg-transparent text-xs resize-none"
            onChange={(e) => setText(e.target.value)}
            value={text}
            autoFocus
            placeholder="Type your markdown here..."
          >
            <ScrollArea className="h-full w-full">{text}</ScrollArea>
          </Textarea>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          <ScrollArea className="h-full w-full">
            <Markdown className="h-full min-w-full p-6 prose dark:prose-invert text-xs ">
              {text}
            </Markdown>
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
