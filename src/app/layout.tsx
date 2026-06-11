import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Natural Veneers ERP',
  description: 'Sistema de gestión premium para laboratorio dental Natural Veneers',
  authors: [{ name: 'Natural Veneers' }],
  keywords: ['laboratorio dental', 'ERP', 'Natural Veneers', 'gestión', 'producción'],
  robots: 'noindex,nofollow', // Internal tool - don't index
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#080a10',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
