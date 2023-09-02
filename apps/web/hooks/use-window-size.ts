import { useEffect, useState } from "react"

interface WindowSize {
  width: number
  height: number
}

export function useWindowSize(): WindowSize {
  const [size, setSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  })

  const handler = () => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  useEffect(() => {
    window.addEventListener("resize", handler)
    return () => window.removeEventListener("resize", handler)
  })

  useEffect(() => console.log(size), [size])

  return size
}
