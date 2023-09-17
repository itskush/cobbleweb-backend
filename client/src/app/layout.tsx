'use client'
import './main.scss'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from "../redux/providers";
import NavBar from '../components/shared/NavBar'
import { Toaster } from 'react-hot-toast';
const inter = Inter({ subsets: ['latin'] })

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
      <body className={inter.className}>
          <Providers>
            <div className="bg-white block w-full !shadow-lg">
              <NavBar />
            </div>
            <div className="min-h-screen bg-gray-100 flex min-w-screen items-center justify-center p-10 md:p-0">
              {children}
            </div>
            <Toaster/>     
          </Providers>
      </body>
    </html>
  )
}
