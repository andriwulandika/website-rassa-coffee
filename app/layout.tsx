import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { cn } from "@/lib/utils";

const title = "Rassa Coffee | Kutacane, Aceh Tenggara";
const description =
  "Coffee shop & B2B supplier premium di Kutacane, Aceh Tenggara. Kopi berkualitas, suasana cozy.";

export const metadata: Metadata = {
  metadataBase: new URL("https://website-rassa-coffee.vercel.app"),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Rassa Coffee",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
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
