import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import RegisterServiceWorker from "./register-sw";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Krawl - Discover Authentic Filipino Culture",
  description: "Community-driven platform mapping authentic Filipino experiences",
  manifest: "/manifest.json",
  themeColor: "#2D7A3E",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Krawl",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Krawl" />
      </head>
      <body className={`${manrope.variable} antialiased`}>
        <RegisterServiceWorker />
        {children}
      </body>
    </html>
  );
}