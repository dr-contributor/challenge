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
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossOrigin="anonymous"></script>
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
