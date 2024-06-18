import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {Toaster} from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "In Construction ...",
  description: "Building Things front-end side",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <head>
          <link rel="icon" href="/favicon.ico"/>
      </head>
      <body className={inter.className}>{children}</body>
      <Toaster/>
      </html>
  );
}
