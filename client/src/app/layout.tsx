'use client'
// import '../styles/main.scss'
import '../../styles/globals.css'
import type { Metadata } from 'next'
import { Providers } from "../redux/providers";
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Shtem',
  description: 'Shtem - Empowering the next generation of creators',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
          <Providers>
              {children}
            <Toaster/>     
          </Providers>
      </body>
    </html>
  )
}
