import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/shared/Header";
import { ReduxProvider } from "@/components/providers/provider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.estorefront.com"),
  title: {
    default: "EStoreFront - Your Online Shopping Destination",
    template: "%s | EStoreFront",
  },
  description:
    "Discover a wide range of products at EStoreFront, your one-stop online store for quality and convenience.",
  keywords: [
    "e-commerce",
    "online shopping",
    "products",
    "retail",
    "store",
    "deals",
    "shopping",
    "electronics",
    "fashion",
    "home goods",
  ],
};

export const viewport: Viewport = {
  themeColor: "#16a34a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "OnlineStore",
              name: "EStoreFront",
              url: "https://www.estorefront.com",
              logo: "https://www.estorefront.com/assets/images/logo.png",
              description:
                "EStoreFront is your one-stop online store offering a wide range of quality products including electronics, fashion, and home goods.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "123 ECommerce Street",
                addressLocality: "City",
                addressRegion: "State",
                postalCode: "12345",
                addressCountry: "KE",
              },
            }),
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-white w-full">
        <ReduxProvider>
          <Header />
          <main className="flex-grow w-full px-4 py-0">
            {children}
            <Toaster
              position="top-center"
              duration={3000}
              richColors
              expand={true}
            />
          </main>
        </ReduxProvider>
      </body>
    </html>
  );
}
