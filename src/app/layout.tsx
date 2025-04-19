import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./../styles/globals.css";
import "leaflet-geosearch/dist/geosearch.css";

import Head from "next/head";
import Providers from "./providers";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>Kostku - Cari & Kelola Kost Lebih Mudah</title>
        <meta
          name="description"
          content="Temukan kost terbaik di Sulawesi Utara. Kelola kost Anda dengan mudah lewat aplikasi Kostku."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Kostku" />
        <meta
          property="og:description"
          content="Platform terbaik untuk mencari dan mengelola kost di Sulawesi Utara."
        />
        <meta property="og:image" content="/preview.png" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
        <Toaster richColors />
      </body>
    </html>
  );
}
