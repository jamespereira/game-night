import type { Metadata, Viewport } from "next";
import { Cabin } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import Image from "next/image";

const inter = Cabin({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "⚔️ Game Night",
  description: "Manage and track your Age of Sigmar game night",
};

export const viewport: Viewport = {
  themeColor: { media: "(prefers-color-scheme: dark)", color: "black" },
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
        <body className={cn(inter.className, "relative", "min-height: 100vw")}>
          <Navbar />
          <Toaster />
          <div className="fixed top-0 left-0 w-full h-full z-[-9] bg-gradient-to-r from-black/75 from-20% to-sky-900/50"></div>
          <div className="fixed top-0 left-0 w-full h-full z-[-10] ">
            <Image
              src={`/images/bg_home.jpg`}
              alt={`aos background image`}
              sizes="100"
              fill
              priority
              className="object-cover"
            />
          </div>
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
