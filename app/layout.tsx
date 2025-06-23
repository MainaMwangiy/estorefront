import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/shared/Header";
import { ReduxProvider } from "@/components/providers/provider";

export const metadata: Metadata = {
  title: "EStoreFront",
  description: "Ecommerce website built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-full flex-col bg-white">
        <ReduxProvider>
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
        </ReduxProvider>
      </body>
    </html>
  );
}
