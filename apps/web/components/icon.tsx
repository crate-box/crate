import { Emoji } from "@acme/web-ui"
import { DashboardIcon, PageIcon } from "@acme/web-ui/icons"

interface IconProps {
  type: "Page" | "Space"
  icon?: string | null
  size?: number
}
export default function Icon({ type, icon, size = 18 }: IconProps) {
  if (icon) {
    return <Emoji emoji={icon} size={size} />
  }
  if (type === "Page")
    return <PageIcon style={{ width: `${size}px`, height: `${size}px` }} />
  if (type === "Space")
    return <DashboardIcon style={{ width: `${size}px`, height: `${size}px` }} />
}
