"use client"

import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"
import { v4 as uuidv4 } from "uuid"

import { default_mk_docs } from "@/lib/utils"

interface Document {
  doc_id: string
  file_name: string
  content: string
  createdAt: string
}

type Documents = Document[]

interface MarkdownContextProps {
  markdown: string
  documents: Document[]
  currentDoc: number | false
  addDoc: (name: string) => void
  handleMarkdownChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  selectDoc: (index: number) => void
  deleteDoc: (index: number) => void
  editNameDoc: (index: number, name: string) => void
  saveDoc: (index: number) => void
  view: boolean
  setView: (value: boolean) => void
}

const MarkdownContext = createContext<MarkdownContextProps | undefined>(
  undefined
)

interface MarkdownProviderProps {
  children: ReactNode
}

export const MarkdownProvider = ({ children }: MarkdownProviderProps) => {
  const [view, setView] = useState<boolean>(true)
  const [markdown, setMarkdown] = useState<string>("")
  const [documents, setDocuments] = useState<Documents>([])
  const [currentDoc, setCurrentDoc] = useState<number | false>(false)

  useEffect(() => {
    if (!localStorage.getItem("mk-docs")) {
      localStorage.setItem("mk-docs", JSON.stringify(default_mk_docs))
      setCurrentDoc(0)
      setDocuments(default_mk_docs)
      setMarkdown(default_mk_docs[0].content)
    }

    if (
      localStorage.getItem("mk-docs") &&
      JSON.parse(localStorage.getItem("mk-docs") || "[]").length === 0
    ) {
      setDocuments([])
      setCurrentDoc(false)
    } else {
      const parsedDocuments = JSON.parse(
        localStorage.getItem("mk-docs") || "[]"
      )
      setDocuments(parsedDocuments)
      setMarkdown(parsedDocuments[0].content)
      setCurrentDoc(0)
    }
  }, [])

  const handleMarkdownChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value)
  }

  const selectDoc = (index: number) => {
    setCurrentDoc(index)
    setMarkdown(documents[index].content)
  }

  const addDoc = (name: string) => {
    const newDoc: Document = {
      doc_id: uuidv4(),
      file_name: name,
      content: "",
      createdAt: new Date().toLocaleDateString("en-US"),
    }

    setDocuments([...documents, newDoc])
    localStorage.setItem("mk-docs", JSON.stringify([...documents, newDoc]))
    setCurrentDoc(documents.length)
    setMarkdown(newDoc.content)
  }

  const deleteDoc = (index: number) => {
    setDocuments(documents.filter((doc, i) => i !== index))
    localStorage.setItem(
      "mk-docs",
      JSON.stringify(documents.filter((doc, i) => i !== index))
    )

    if (documents.length === 1) {
      setCurrentDoc(false)
      setMarkdown("")
    } else {
      setCurrentDoc(documents.length - 2)
      setMarkdown(documents[documents.length - 2].content)
    }
  }

  const editNameDoc = (index: number, name: string) => {
    setDocuments(
      documents.map((doc, i) =>
        index === i ? { ...doc, file_name: name } : doc
      )
    )
    localStorage.setItem(
      "mk-docs",
      JSON.stringify(
        documents.map((doc, i) =>
          index === i ? { ...doc, file_name: name } : doc
        )
      )
    )
  }

  const saveDoc = (index: number) => {
    setDocuments(
      documents.map((doc, i) =>
        index === i ? { ...doc, content: markdown } : doc
      )
    )
    localStorage.setItem(
      "mk-docs",
      JSON.stringify(
        documents.map((doc, i) =>
          index === i ? { ...doc, content: markdown } : doc
        )
      )
    )
  }

  return (
    <MarkdownContext.Provider
      value={{
        markdown,
        documents,
        currentDoc,
        addDoc,
        handleMarkdownChange,
        selectDoc,
        deleteDoc,
        editNameDoc,
        saveDoc,
        view,
        setView,
      }}
    >
      {children}
    </MarkdownContext.Provider>
  )
}

export const useMarkdownContext = () => {
  const context = useContext(MarkdownContext)
  if (!context) {
    throw new Error(
      "useMarkdownContext must be used within a MarkdownContextProvider"
    )
  }
  return context
}
