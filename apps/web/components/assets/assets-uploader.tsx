"use client"

import * as React from "react"
import { useDropzone } from "react-dropzone"
import type { DropzoneOptions } from "react-dropzone"

import { ImageIcon } from "@acme/web-ui/icons"

import { api } from "~/lib/api"
import Spinner from "../spinner"

export default function AssetsUploader() {
  const context = api.useContext()
  const { mutateAsync: uploadAsset, isLoading } = api.asset.upload.useMutation({
    async onSuccess() {
      await context.asset.all.invalidate()
    },
  })

  const onDrop = React.useCallback<Required<DropzoneOptions>["onDrop"]>(
    (acceptedFiles) => {
      if (acceptedFiles.length < 1) return
      const reader = new FileReader()
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      reader.addEventListener("loadend", async () => {
        const uri = reader.result as string
        await uploadAsset({ uris: [uri] })
      })

      acceptedFiles.forEach((file) => {
        reader.readAsDataURL(file)
      })
    },
    [uploadAsset]
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 1024 * 1024 * 5,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/gif": [".gif"],
      "image/svg+xml": [".svg"],
      "video/mp4": [".mp4"],
    },
  })

  return (
    <label
      htmlFor="file"
      {...getRootProps}
      className={`grid h-full cursor-pointer place-items-center rounded-lg bg-slate-800 ${
        isLoading
          ? "pointer-events-none opacity-50"
          : "pointer-events-auto opacity-100"
      }`}
    >
      <input id="file" {...getInputProps()} />
      {isLoading ? (
        <Spinner text="Uploading..." />
      ) : (
        <div className="flex flex-col items-center gap-4">
          <ImageIcon className="h-12 w-12" />
          {isDragActive ? (
            <p>Drop the files here</p>
          ) : (
            <p>The maximum file size is 5 MB</p>
          )}
        </div>
      )}
    </label>
  )
}
