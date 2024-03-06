import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import JotaiProvider from "@/components/jotai/provider";
import { Toaster } from "@/components/ui/sonner";
import TanstackQueryProvider from "@/components/tanstack-query/provider";
import Link from "next/link";

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
          <TanstackQueryProvider>
            <Toaster richColors />
            <div className="p-4 bg-slate-950">
              <div className="px-8 max-w-wrapper mx-auto">
                <Link
                  href="/"
                  className="font-bold text-slate-100 uppercase tracking-widest text-xl"
                >
                  Mailtuned
                </Link>
              </div>
            </div>
            {children}
          </TanstackQueryProvider>
        </JotaiProvider>
      </body>
    </html>
  );
}
