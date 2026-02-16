import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-plus-jakarta',
})

export const metadata: Metadata = {
  title: 'Exius - Crypto Savings Platform',
  description: 'Earn up to 26% yearly on your crypto with daily compounding and no lockups',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${plusJakarta.className} bg-black`}>{children}</body>
    </html>
  )
}
