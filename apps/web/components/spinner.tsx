import Logo from "@acme/web-ui/logo"

export default function Spinner({ text = "Loading" }: { text?: string }) {
  return (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center gap-4">
      <Logo className="h-8 w-8 animate-spin" />
      <div className="animate-pulse">{text}</div>
    </div>
  )
}
