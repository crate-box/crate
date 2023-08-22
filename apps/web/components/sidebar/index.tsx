import ProfileButton from "~/components/profile/profile-button"
import SidebarContent from "./sidebar-content"

export default function Sidebar() {
  return (
    <nav className="w-[240px] min-w-[240px] bg-slate-950">
      <div className="flex h-full w-full flex-col items-stretch gap-2">
        <ProfileButton />
        <SidebarContent />
      </div>
    </nav>
  )
}
