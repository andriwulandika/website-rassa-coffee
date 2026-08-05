import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Rassa Coffee | Kutacane, Aceh Tenggara",
  description:
    "Coffee shop & B2B supplier premium di Kutacane, Aceh Tenggara. Kopi berkualitas, suasana cozy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(GeistSans.variable, GeistMono.variable)}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
