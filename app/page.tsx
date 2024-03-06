"use client"

import { useMarkdownContext } from "@/context/MarkdownContext"
import Markdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { materialOceanic } from "react-syntax-highlighter/dist/cjs/styles/prism"
import remarkGfm from "remark-gfm"

import { cn } from "@/lib/utils"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"

export default function IndexPage() {
  const { markdown, handleMarkdownChange, view } = useMarkdownContext()

  const options = { code: CodeBlock, pre: Pre }

  return (
    <div className="container h-screen  items-center pb-8 pt-6 md:py-5 overflow-hidden">
      <ResizablePanelGroup
        direction="horizontal"
        className="max-h-full min-w-full rounded-lg border"
      >
        <ResizablePanel defaultSize={view ? 50 : 100}>
          <Textarea
            id="markdown-editor"
            className="flex min-h-full min-w-full items-center justify-center p-6 bg-transparent text-xs resize-none rounded-none"
            onChange={handleMarkdownChange}
            value={markdown}
            autoFocus
            placeholder="Type your markdown here..."
          ></Textarea>
        </ResizablePanel>
        {view && <ResizableHandle withHandle />}
        <ResizablePanel
          defaultSize={50}
          className={cn({ hidden: !view, visible: view })}
        >
          <ScrollArea className="h-full w-full">
            <Markdown
              remarkPlugins={[remarkGfm]}
              components={options}
              className="h-full min-w-full p-6 prose dark:prose-invert text-xs"
            >
              {markdown}
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
      wrapLines={true}
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
