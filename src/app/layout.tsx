import type { Metadata } from "next";
import { roboto } from "@/src/config/font";
import "./globals.css";

export const metadata: Metadata = {
  title: "CChang Constructora",
  description: "Constructura de alta calidad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.className}>
      <body className={roboto.className}>
        {children}
      </body>
    </html>
  );
}
