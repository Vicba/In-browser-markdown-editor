"use client"

import { useEffect, useState } from "react"
import Markdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { materialOceanic } from "react-syntax-highlighter/dist/cjs/styles/prism"

import { default_mk_docs } from "@/lib/utils"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"

export default function IndexPage() {
  const [text, setText] = useState<string>("")

  const [documents, setDocuments] = useLocalStorage("mk-docs", default_mk_docs)

  console.log("documents", documents)

  const options = { code: CodeBlock, pre: Pre }

  return (
    <div className="container h-screen  grid items-center pb-8 pt-6 md:py-5">
      <ResizablePanelGroup
        direction="horizontal"
        className="max-h-full min-w-full rounded-lg border overflow"
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
            <ScrollArea className="h-full w-full"></ScrollArea>
          </Textarea>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          <ScrollArea className="h-full w-full">
            <Markdown
              components={options}
              className="h-full min-w-full p-6 prose dark:prose-invert text-xs "
            >
              {text}
            </Markdown>
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export const CodeBlock = ({ ...props }) => {
  return (
    <SyntaxHighlighter
      language={props.className?.replace(/(?:lang(?:uage)?-)/, "")}
      style={materialOceanic}
      wrapLines={true} //
      className="not-prose rounded-md bg-transparent"
    >
      {props.children}
    </SyntaxHighlighter>
  )
}

// removes the black background from the pre tag
export const Pre = ({ ...props }) => {
  return <div className="not-prose">{props.children}</div>
}
