import { useLayoutEffect, useState } from "react"

export function useMediaQueries(
  queries: string[],
  defaultValues: boolean[] = []
): boolean[] {
  const initialValues = defaultValues?.length
    ? defaultValues
    : (Array(queries.length).fill(false) as boolean[])

  const isServer = typeof window === "undefined"

  const queryLists = isServer
    ? undefined
    : queries.map((q) => window.matchMedia(q))
  const getValue = () => {
    return queryLists?.map((ql) => ql.matches)
  }
  const matches = queryLists?.map((ql) => ql.matches)

  const [value, setValue] = useState(isServer ? initialValues : matches)

  useLayoutEffect(() => {
    const handler = () => setValue(getValue)
    queryLists?.forEach((ql) => ql.addEventListener("change", handler))

    return () =>
      queryLists?.forEach((ql) => ql.removeEventListener("change", handler))
  })

  return value ?? initialValues
}
