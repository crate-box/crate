import { useState } from "react"

// @see https://usehooks-ts.com/react-hook/use-copy-to-clipboard
type CopiedValue = string | null
type CopyFn = (text: string) => Promise<boolean> // Return success

export function useClipboard(): {
  value: CopiedValue
  copy: CopyFn
  success: boolean
} {
  const [value, setValue] = useState<CopiedValue>(null)
  const [success, setSuccess] = useState<boolean>(false)

  const copy: CopyFn = async (text) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported")
      return false
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text)
      setValue(text)
      setSuccess(true)
      return true
    } catch (error) {
      console.warn("Copy failed", error)
      setValue(null)
      setSuccess(false)
      return false
    }
  }

  return { value, copy, success }
}
