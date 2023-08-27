import { IBM_Plex_Sans, Inter } from "next/font/google"
import { headers } from "next/headers"

import "@acme/tailwind-config/globals.css"

import { ApiProvider } from "./providers"

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
})

const fontHeading = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontHeading.variable}`}>
      <body className="bg-slate-900 font-sans text-base text-slate-200">
        <ApiProvider headers={headers()}>{children}</ApiProvider>
      </body>
    </html>
  )
}
