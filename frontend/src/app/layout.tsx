import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from "./components/layout/Header"
import Footer from "./components/layout/Footer"
import Head from "next/head";
import "./css/app.css";
import "./css/header.css";
import "./css/footer.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Archimed Challenge',
  description: 'Frontend for the Archimed API',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body className={inter.className}>
        <Header />
        <div className="container grid">
          <main className="content">
            {children}
          </main>
        </div>
        <Footer />
      </body>
    </html>
  )
}
