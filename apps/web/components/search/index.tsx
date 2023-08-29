"use client"

import * as React from "react"
import { useForm } from "react-hook-form"

import { Input } from "@acme/web-ui"
import { ClearIcon, SearchIcon } from "@acme/web-ui/icons"

import Spinner from "~/components/spinner"
import { useDebounce } from "~/hooks"
import SearchResults from "./search-results"

interface SearchFormInputs {
  query: string
}
export default function Search() {
  const { watch, register, reset, setFocus } = useForm<SearchFormInputs>({
    defaultValues: { query: "" },
  })
  const debouncedQuery = useDebounce(watch("query"))

  return (
    <div className="mt-2 flex flex-1 flex-col items-stretch">
      <form
        className="relative flex items-center"
        onSubmit={(e) => e.preventDefault()}
      >
        <SearchIcon className="absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
        <Input
          aria-label="Search query"
          {...register("query")}
          placeholder="Type to search"
          className="pl-8"
        />
        <button
          aria-label="Clear search"
          type="button"
          className="absolute right-2 top-1/2 inline-flex h-4 w-4 -translate-y-1/2 items-center justify-center rounded-full bg-slate-700 transition-[opacity] duration-200 data-[hidden=true]:opacity-0"
          data-hidden={watch("query") === ""}
          onClick={() => {
            reset()
            setFocus("query")
          }}
        >
          <ClearIcon className="h-3.5 w-3.5" />
        </button>
      </form>
      {debouncedQuery !== "" && (
        <React.Suspense fallback={<Spinner text="Searching" />}>
          <SearchResults query={debouncedQuery} />
        </React.Suspense>
      )}
    </div>
  )
}
