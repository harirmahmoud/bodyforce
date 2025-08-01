import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Body Force",
  description:
    "Shop premium home appliances including air conditioners, dishwashers, refrigerators, and more. Energy-efficient models with free installation.",
  keywords: "appliances, air conditioner, dishwasher, refrigerator, washing machine, electronics, home appliances",
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
       
        <main>{children}</main>
      
      </body>
    </html>
  )
}
