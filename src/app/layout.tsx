import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Providers from "@/context/providers";
import { ClerkProvider } from "@clerk/nextjs";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next Games",
  description: "A game DB built with Next JS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${outfit.className} antialiased`}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
