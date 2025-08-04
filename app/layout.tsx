import type { Metadata } from "next";
import "./globals.css";
import GoogleAnalytics from './plugins/GoogleAnalytics';

export const metadata: Metadata = {
  title: 'Stuff Kids Ask',
  description: 'Kids ask many interesting and thought-provoking questions as they learn about the world. This site will help you engage with your children in meaningful conversations.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <GoogleAnalytics />
      <body>{children}</body>
    </html>
  )
}
