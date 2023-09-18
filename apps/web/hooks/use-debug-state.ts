import { useEffect } from "react"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebugState(label = "State", value: any) {
  useEffect(() => {
    console.log(`${label}: `, value)
  }, [value, label])
}
