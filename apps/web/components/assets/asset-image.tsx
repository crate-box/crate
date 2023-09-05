import Image from "next/image"
import Link from "next/link"

import type { RouterOutputs } from "@acme/api"
import {
  AlertAction,
  AlertCancel,
  AlertContent,
  AlertDescription,
  AlertOverlay,
  AlertPortal,
  AlertRoot,
  AlertTitle,
  AlertTrigger,
  Button,
  DialogClose,
  DialogContent,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  IconButton,
  iconButtonVariants,
  Tooltip,
} from "@acme/web-ui"
import { useToast } from "@acme/web-ui/hooks"
import {
  ClearIcon,
  DownloadIcon,
  EyeIcon,
  LoadingIndicatorIcon,
  TrashIcon,
} from "@acme/web-ui/icons"

import { api } from "~/lib/api"
import { formatDate, getAssetFilename } from "~/lib/utils"
import type { InferElement } from "~/types"

interface AssetImageProps extends React.HTMLAttributes<HTMLDivElement> {
  asset: InferElement<RouterOutputs["asset"]["all"]>
}
export default function AssetImage({ asset, ...props }: AssetImageProps) {
  const filename = getAssetFilename(asset.url)
  const { toast } = useToast()

  const context = api.useContext()
  const { mutateAsync: deleteAsset, isLoading } = api.asset.delete.useMutation({
    async onSuccess() {
      await context.asset.all.invalidate()
    },
    onError(err) {
      toast({
        variant: "destructive",
        title: "Cannot delete this asset",
        description: err.data?.zodError?.fieldErrors?.data?.[0] ?? err.message,
      })
    },
  })

  const onDeleteImage = async () => {
    await deleteAsset({ id: asset.id })
  }

  return (
    <Tooltip text={filename + ` (${formatDate(asset.createdAt)})`}>
      <div
        className="group relative aspect-square cursor-pointer overflow-hidden rounded bg-slate-800"
        {...props}
      >
        <Image
          key={asset.id}
          src={asset.url}
          alt={filename}
          fill={true}
          className="object-cover"
        />
        <div className="absolute right-0 top-0 flex items-center gap-1 p-1">
          <DialogRoot>
            <DialogTrigger asChild>
              <IconButton size="sm">
                <EyeIcon className="h-[18px] w-[18px]" />
              </IconButton>
            </DialogTrigger>
            <DialogPortal>
              <DialogContent className="tablet:max-w-screen h-screen w-screen tablet:h-screen tablet:max-h-screen tablet:w-screen">
                <div className="mt-6 flex items-center justify-between">
                  <DialogTitle>
                    {filename}{" "}
                    <span className="font-normal">
                      (Uploaded on{" "}
                      <time dateTime={asset.createdAt.toISOString()}>
                        {formatDate(asset.createdAt)}
                      </time>
                      )
                    </span>
                  </DialogTitle>
                  <div className="flex items-center gap-2">
                    <a
                      className={iconButtonVariants({})}
                      href={asset.url}
                      download={filename}
                    >
                      <DownloadIcon className="h-[18px] w-[18px]" />
                    </a>
                    <AlertRoot>
                      <AlertTrigger asChild>
                        <IconButton variant="destructive">
                          {isLoading ? (
                            <LoadingIndicatorIcon className="h-[18px] w-[18px] animate-spin" />
                          ) : (
                            <TrashIcon className="h-[18px] w-[18px]" />
                          )}
                        </IconButton>
                      </AlertTrigger>
                      <AlertPortal>
                        <AlertOverlay />
                        <AlertContent>
                          <AlertTitle>Delete this image permanently</AlertTitle>
                          <AlertDescription>
                            Are you absolutely sure to delete this image. This
                            action cannot be undone.
                          </AlertDescription>
                          <div className="flex items-center justify-end gap-1">
                            <AlertAction asChild>
                              <Button
                                variant="destructive"
                                onClick={onDeleteImage}
                              >
                                Delete
                              </Button>
                            </AlertAction>
                            <AlertCancel asChild>
                              <Button variant="text">Cancel</Button>
                            </AlertCancel>
                          </div>
                        </AlertContent>
                      </AlertPortal>
                    </AlertRoot>
                  </div>
                </div>
                <div className="relative mt-2 h-full w-full">
                  <Link href={asset.url} target="_blank">
                    <Image
                      key={asset.id}
                      src={asset.url}
                      alt={asset.url}
                      fill={true}
                      className="object-cover"
                    />
                  </Link>
                </div>
                <DialogClose asChild>
                  <IconButton
                    size="sm"
                    className="absolute right-2 top-2 text-slate-500 hover:text-slate-300"
                    aria-label="Close"
                  >
                    <ClearIcon className="h-[18px] w-[18px]" />
                  </IconButton>
                </DialogClose>
              </DialogContent>
            </DialogPortal>
          </DialogRoot>
        </div>
      </div>
    </Tooltip>
  )
}
