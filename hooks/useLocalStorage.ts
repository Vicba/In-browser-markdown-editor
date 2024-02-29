import { useEffect, useState } from "react"

import { markdown_docs } from "@/types/markdown_docs"

export const getSavedValue = (keyName: string, defaultValue?: any) => {
  // if (typeof window !== "undefined") {
  // Check if the window object is defined (client-side)
  const value = window.localStorage.getItem(keyName)

  if (value) {
    return JSON.parse(value)
  } else {
    window.localStorage.setItem(keyName, JSON.stringify(defaultValue))
    return defaultValue
  }
  // } else {
  //   // If running on the server side, return the default value
  //   return defaultValue
  // }
}

export const useLocalStorage = (keyName: string, defaultValue?: any) => {
  const [storedValue, setStoredValue] = useState(defaultValue)

  const setValue = (newValue: any) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue))
    } catch (err) {
      console.error(err)
    }
    setStoredValue(newValue)
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Only run if the window object is defined (to avoid server-side execution)
      setStoredValue(getSavedValue(keyName, defaultValue))
    }
  }, [])

  return [storedValue, setValue]
}
// useLocalStorage.ts
// useLocalStorage.ts
// useLocalStorage.ts
// import { useEffect, useState } from "react"

// export const useLocalStorage = <T>(key: string, defaultValue?: T) => {
//   const [loading, setLoading] = useState(true)
//   const [storedValue, setStoredValue] = useState<T | null>(() => {
//     if (typeof window !== "undefined") {
//       const item = window.localStorage.getItem(key)
//       return item ? JSON.parse(item) : defaultValue ?? null
//     }
//     return null
//   })

//   const setValue = (value: T) => {
//     try {
//       window.localStorage.setItem(key, JSON.stringify(value))
//       setStoredValue(value)
//     } catch (error) {
//       console.error("Error setting localStorage:", error)
//     }
//   }

//   useEffect(() => {
//     if (loading) {
//       setLoading(false)
//     }
//   }, [loading])

//   return [storedValue, setValue, loading] as const
// }
