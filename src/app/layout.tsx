import type { Metadata } from "next";
import { roboto } from "@/src/config/font";
import "./globals.css";
import I18nProvider from "./i18n-provider";

export const metadata: Metadata = {
  title: "CChang Constructora",
  description: "Constructura de alta calidad",
  icons: "/constructora-removebg-preview.png",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={roboto.className}>
      <body className={roboto.className}>
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
