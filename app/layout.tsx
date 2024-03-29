import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={cn(inter.className, "bg-stone-800", "relative")}>
          <header>
            <Navbar />
          </header>
          <Toaster />
          <Image
            src={`/aos_bg.jpg`}
            alt={`aos background image`}
            sizes="100"
            fill
            priority
            style={{ objectFit: "cover", zIndex: -1, borderRadius: "0.75rem" }}
          />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
