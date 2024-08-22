import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { reggaeOne, stick } from "./utiles/font";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "早押しボタン",
  description: "早押しボタンアプリです",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${reggaeOne.variable} ${stick.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
