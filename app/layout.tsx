import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Furchill Launchpad - Deploy Your Memecoin',
  description: 'Launch your memecoin with ease on the Furchill Launchpad. Deploy tokens with customizable taxes, LP allocation, and wallet distributions.',
  keywords: 'memecoin, launchpad, token deployment, ethereum, defi',
  authors: [{ name: 'Furchill Team' }],
  openGraph: {
    title: 'Furchill Launchpad',
    description: 'Deploy your memecoin with ease',
    url: 'https://furchill.com',
    siteName: 'Furchill Launchpad',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Furchill Launchpad',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Furchill Launchpad',
    description: 'Deploy your memecoin with ease',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1e293b',
                color: '#fff',
                border: '1px solid #334155',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
