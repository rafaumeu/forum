import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Providers } from './providers'
import { Header } from '@/components/header'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#09090b',
}

export const metadata: Metadata = {
  title: {
    default: 'Forum — Perguntas e Respostas',
    template: '%s | Forum',
  },
  description:
    'Plataforma de perguntas e respostas para estudantes. Compartilhe conhecimento, tire dúvidas e aprenda com a comunidade.',
  keywords: [
    'forum',
    'perguntas',
    'respostas',
    'estudantes',
    'comunidade',
    'educação',
  ],
  authors: [{ name: 'Rafael Zendron' }],
  creator: 'Rafael Zendron',
  metadataBase: new URL('https://forum-zendron.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Forum',
    title: 'Forum — Perguntas e Respostas',
    description: 'Plataforma de perguntas e respostas para estudantes.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Forum — Perguntas e Respostas',
    description: 'Plataforma de perguntas e respostas para estudantes.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Forum',
  description: 'Plataforma de perguntas e respostas para estudantes',
  url: 'https://forum-zendron.vercel.app',
  inLanguage: 'pt-BR',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
