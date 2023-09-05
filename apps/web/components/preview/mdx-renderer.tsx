/*eslint-disable jsx-a11y/heading-has-content*/
"use client"

import Image from "next/image"
import type { ImageProps } from "next/image"
import type { MDXRemoteSerializeResult } from "next-mdx-remote"
import { MDXRemote } from "next-mdx-remote"

import { cn } from "@acme/web-ui/utils"

export default function MdxRenderer({
  source,
}: {
  source: MDXRemoteSerializeResult
}) {
  return (
    <div
      aria-label="Preview"
      className="h-[100vh-40px] max-h-[100vh-40px] min-w-full max-w-full overflow-auto p-4 text-lg"
    >
      <div className="mx-auto max-w-[720px]">
        <MDXRemote {...source} components={components} />
      </div>
    </div>
  )
}

const components = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        "mt-2 scroll-m-4 text-[2em] font-bold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        "mt-2 scroll-m-4 text-[1.5em] font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        "mt-2 scroll-m-4 text-[1.17em] font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        "mt-2 scroll-m-4 text-[1em] font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5
      className={cn(
        "mt-2 scroll-m-4 text-[0.83em] font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6
      className={cn(
        "mt-2 scroll-m-4 text-[0.67em] font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn("leading-relaxed [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className={cn("my-2 ml-4 list-inside list-disc", className)}
      {...props}
    />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className={cn("my-2 ml-4 list-inside list-decimal", className)}
      {...props}
    />
  ),
  li: ({ className, ...props }: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  blockquote: ({
    className,
    ...props
  }: React.QuoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn(
        "mt-4 border-l-4 border-slate-300 pl-4 italic text-slate-400 [&>*]:text-slate-400",
        className
      )}
      {...props}
    />
  ),
  table: ({
    className,
    ...props
  }: React.TableHTMLAttributes<HTMLTableElement>) => (
    <table className={cn("my-6 border-collapse", className)} {...props} />
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn(
        "p-0 transition-colors duration-200 hover:bg-slate-800",
        className
      )}
      {...props}
    />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        "border-b border-slate-800 px-6 py-2 text-left text-sm font-medium uppercase text-slate-400 [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        "px-6 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  img: ({ className, src, alt }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={cn("mt-6 rounded-md", className)}
      src={src ?? ""}
      alt={alt ?? "Image"}
    />
  ),
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-8 border-slate-200" {...props} />
  ),
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className={cn(
        "my-6 overflow-x-auto rounded p-4 text-base leading-relaxed shadow-2xl",
        className
      )}
      {...props}
    />
  ),
  code: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLElement> & { "data-language"?: string }) =>
    props["data-language"] ? (
      <code className={className} {...props} />
    ) : (
      <code
        className={cn(
          "relative rounded-sm bg-slate-800 px-[0.5em] py-[0.25em] font-mono text-base text-slate-200",
          className
        )}
        {...props}
      />
    ),
  div: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLDivElement> & {
    "data-rehype-pretty-code-title"?: string
  }) =>
    props["data-rehype-pretty-code-title"] === undefined ? (
      <div className={className} {...props} />
    ) : (
      <div
        className={cn(
          'relative -mb-6 rounded-tl-lg rounded-tr-lg bg-slate-800 px-4 py-2 text-sm text-slate-400 before:absolute before:left-0 before:top-full before:h-2 before:w-full before:bg-[#242d2f] before:content-[""]',
          className
        )}
        {...props}
      />
    ),
  Image: ({ className, ...props }: ImageProps) => (
    <Image className={cn("mt-6 rounded-md", className)} {...props} />
  ),
}
