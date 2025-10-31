import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"

// EDIT: Change font family here if needed
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Barak Advert - Professional Printing & Sign Services",
  description:
    "Premium printing, neon signs, lightboxes, T-shirt printing, mugs, and custom merchandise. Professional advertising solutions for your business.",
  keywords: "printing, neon signs, lightbox, t-shirt printing, mug printing, advertising, signage",
  openGraph: {
    title: "Barak Advert - Professional Printing & Sign Services",
    description: "Premium printing and sign services for your business",
    type: "website",
  },
  // Provide favicon/icon metadata so Next.js and browsers can find the favicon
  icons: {
    // Primary icon served from /public
    icon: [
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} font-sans bg-background text-foreground`}>{children}</body>
    </html>
  )
}
