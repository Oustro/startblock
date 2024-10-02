import type { Metadata } from "next";
import "../styles/globals.css";
import localFont from 'next/font/local'
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: "Startblock | The delightfully simple hiring platform for startups",
  description: "The delightfully simple and affordable hiring platform for startups.",
  openGraph: {
    images: '/startblock-og.png',
  },
  metadataBase: new URL("https://www.startblock.me"),
};

const heading = localFont({
  src: '../public/font/heading.woff2',
  variable: '--font-heading',
})

const accent = localFont({
  src: '../public/font/accent.woff2',
  variable: '--font-accent',
})

const text = localFont({
  src: '../public/font/text.woff2',
  variable: '--font-text',
})

const special = localFont({
  src: '../public/font/special.woff2',
  variable: '--font-special',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-text ${heading.variable} ${text.variable} ${accent.variable} ${special.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
