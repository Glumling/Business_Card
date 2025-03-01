import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { SettingsProvider } from "@/components/SettingsContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Digital Business Card",
  description: "Your professional digital presence",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SettingsProvider>{children}</SettingsProvider>
      </body>
    </html>
  )
}



import './globals.css'