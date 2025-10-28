import type { Metadata } from "next";
import { roboto } from "@/src/config/font";
import "../globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <main className="min-h-screen">
    {children}
   </main>
  );
}
