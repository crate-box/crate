import Link from "next/link"

const links = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/docs",
    label: "Docs",
  },
  {
    href: "/support",
    label: "Support",
  },
  {
    href: "/blog",
    label: "Blog",
  },
]

export default function MainNav() {
  return (
    <nav>
      <ul className="flex flex-col items-center gap-8 py-8 text-lg tablet:flex-row tablet:py-0 tablet:text-base">
        {links.map((link) => (
          <li key={link.label}>
            <NavLink href={link.href}>{link.label}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

interface NavLinkProps extends React.PropsWithChildren {
  href: string
}
function NavLink({ href, children }: NavLinkProps) {
  return (
    <Link
      href={href}
      className="font-medium transition-colors duration-200 hover:text-slate-50"
    >
      {children}
    </Link>
  )
}
