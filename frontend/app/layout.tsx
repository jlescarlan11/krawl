import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import RegisterServiceWorker from "./register-sw";
import Toaster from "@/components/Toaster";
import DBInitializer from "@/components/DBInitializer";
import NetworkStatus from "@/components/NetworkStatus";
import SyncManager from "@/components/SyncManager";
import { AuthProvider } from "@/context/AuthContext";
import { SidebarProvider } from "@/context/SidebarContext";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Krawl - Discover Authentic Filipino Culture",
  description: "Community-driven platform mapping authentic Filipino experiences",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Krawl",
  },
};

export const viewport: Viewport = {
  themeColor: "#2D7A3E",
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
        <link rel="icon" type="image/png" sizes="16x16" href="/ios/16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/ios/32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/ios/180.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Krawl" />
      </head>
      <body className={`${manrope.variable} antialiased`}>
        <RegisterServiceWorker />
        <DBInitializer />
        <NetworkStatus />
        <SyncManager />
        <Toaster />
        <AuthProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}