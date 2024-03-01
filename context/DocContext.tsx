"use client"

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

import { doc } from "@/types/markdown_docs"

type SelectedDocContextType = {
  selectedDoc: doc | null
  setSelectedDoc: Dispatch<SetStateAction<doc | null>>
}

// default to welcome.md
export const SelectedDocContext = createContext<SelectedDocContextType>({
  selectedDoc: null,
  setSelectedDoc: () => {},
})

type DocProviderProps = {
  children: ReactNode
}

export const DocProvider = ({ children }: DocProviderProps) => {
  const [selectedDoc, setSelectedDoc] = useState<doc | null>(null)

  return (
    <SelectedDocContext.Provider value={{ selectedDoc, setSelectedDoc }}>
      {children}
    </SelectedDocContext.Provider>
  )
}

export const useSelectedDoc = () => {
  const context = useContext(SelectedDocContext)
  if (!context) {
    throw new Error("useSelectedDoc must be used within a SelectedDocProvider")
  }
  return context
}
