import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DL Details - Driving License Information',
  description: 'Automated Driving License details form with print and export functionality',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
