import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import JotaiProvider from "@/components/jotai/provider";
import { Toaster } from "@/components/ui/sonner";

const plus_jakarta_sans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mailtuned",
  description: "GoDaddy DNS Toolkit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={plus_jakarta_sans.className}>
        <JotaiProvider>
          <Toaster richColors />
          {children}
        </JotaiProvider>
      </body>
    </html>
  );
}
