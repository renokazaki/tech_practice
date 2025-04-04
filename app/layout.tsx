import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Header } from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Management",
  description: "Task Management application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl="/sign-in">
      <html lang="ja" className="h-full">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
        >
          <div className="flex flex-col h-full">
            <Header />
            <main className="flex-1 overflow-y-auto mt-16">{children}</main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
