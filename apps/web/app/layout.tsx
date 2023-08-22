import { IBM_Plex_Sans, Inter } from "next/font/google"
import { headers } from "next/headers"

import "~/styles/globals.css"

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
      <body>
        <ApiProvider headers={headers()}>{children}</ApiProvider>
      </body>
    </html>
  )
}
