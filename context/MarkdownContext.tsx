"use client"

import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"
import { Doc } from "@/types"
import { v4 as uuidv4 } from "uuid"

import { default_mk_docs } from "@/lib/utils"

interface MarkdownContextProps {
  markdown: string
  documents: Doc[]
  currentDoc: Doc
  addDoc: (name: string) => void
  handleMarkdownChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  selectDoc: (id: string) => void
  deleteDoc: (id: string) => void
  editFileName: (id: string, name: string) => void
  saveDoc: (id: string) => void
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
  const [documents, setDocuments] = useState<Doc[]>([])
  const [currentDoc, setCurrentDoc] = useState<Doc>(documents[0])

  useEffect(() => {
    const storedDocs = localStorage.getItem("mk-docs")
    if (!storedDocs) {
      localStorage.setItem("mk-docs", JSON.stringify(default_mk_docs))
      setCurrentDoc(default_mk_docs[0])
      setDocuments(default_mk_docs)
      setMarkdown(default_mk_docs[0].content)
    } else {
      const parsedDocuments = JSON.parse(storedDocs)
      setDocuments(parsedDocuments)
      setCurrentDoc(parsedDocuments[0])
      setMarkdown(parsedDocuments[0].content)
    }
  }, [])

  const handleMarkdownChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value)
  }

  const selectDoc = (id: string) => {
    const document: Doc | undefined = documents.find((doc) => doc.doc_id === id)
    if (document) {
      setCurrentDoc(document)
      setMarkdown(document.content)
    }
  }

  const addDoc = (name: string) => {
    const newDoc: Doc = {
      doc_id: uuidv4(),
      file_name: name,
      content: "",
      createdAt: new Date().toLocaleDateString("en-US"),
    }

    setDocuments([...documents, newDoc])
    localStorage.setItem("mk-docs", JSON.stringify([...documents, newDoc]))
    setCurrentDoc(newDoc)
    setMarkdown(newDoc.content)
  }

  const deleteDoc = (id: string) => {
    const updatedDocs = documents.filter((doc) => doc.doc_id !== id)
    setDocuments(updatedDocs)
    localStorage.setItem("mk-docs", JSON.stringify(updatedDocs))

    if (updatedDocs.length === 1) {
      setCurrentDoc(updatedDocs[0])
      setMarkdown(updatedDocs[0].content)
    } else if (updatedDocs.length > 1) {
      setCurrentDoc(updatedDocs[updatedDocs.length - 2])
      setMarkdown(updatedDocs[updatedDocs.length - 2].content)
    } else {
      const new_doc: Doc = {
        doc_id: uuidv4(),
        file_name: "Untitled.md",
        content: "",
        createdAt: new Date().toLocaleDateString("en-US"),
      }
      setCurrentDoc(new_doc)
      setMarkdown("")
      setDocuments([new_doc])
    }
  }

  const editFileName = (id: string, name: string) => {
    const updatedDocs = documents.map((doc) =>
      doc.doc_id === id ? { ...doc, file_name: name } : doc
    )
    setDocuments(updatedDocs)
    localStorage.setItem("mk-docs", JSON.stringify(updatedDocs))
  }

  const saveDoc = (id: string) => {
    const updatedDocs = documents.map((doc) =>
      doc.doc_id === id ? { ...doc, content: markdown } : doc
    )
    setDocuments(updatedDocs)
    localStorage.setItem("mk-docs", JSON.stringify(updatedDocs))
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
        editFileName,
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
