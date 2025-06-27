import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/shared/Header";
import { ReduxProvider } from "@/components/providers/provider";
import { Toaster } from "sonner";

// Comprehensive Metadata Configuration
export const metadata: Metadata = {
  metadataBase: new URL("https://www.estorefront.com"), // Replace with your actual domain
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
  ],
  // Open Graph Metadata for Social Sharing
  openGraph: {
    title: "EStoreFront - Your Online Shopping Destination",
    description:
      "Shop the best deals on a wide range of products at EStoreFront, your trusted online store.",
    url: "https://www.estorefront.com",
    siteName: "EStoreFront",
    images: [
      {
        url: "/assets/images/og-image.jpg", // Replace with your actual OG image path
        width: 1200,
        height: 630,
        alt: "EStoreFront - Online Shopping",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  // Twitter Card Metadata
  twitter: {
    card: "summary_large_image",
    title: "EStoreFront - Your Online Shopping Destination",
    description:
      "Shop the best deals on a wide range of products at EStoreFront, your trusted online store.",
    images: ["/assets/images/og-image.jpg"], // Replace with your actual Twitter image path
  },
  // Verification tokens for webmaster tools (optional, add if you have them)
  verification: {
    google: "your-google-site-verification-token", // Replace with your Google verification token
  },
  // Alternate language versions (if your site supports multiple languages)
  alternates: {
    canonical: "https://www.estorefront.com",
    languages: {
      "en-US": "https://www.estorefront.com/en",
      // Add other languages if applicable, e.g., 'es-US': 'https://www.estorefront.com/es'
    },
  },
  // Robots directive for search engine crawling
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Icons and app configuration
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  // Application manifest for PWA support
  manifest: "/manifest.json",
};

// Viewport Configuration for Responsive Design
export const viewport: Viewport = {
  themeColor: "#ffffff", // Replace with your brand color for EStoreFront
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
        {/* Preload critical assets (e.g., fonts or CSS if applicable) */}
        {/* Example: <link rel="preload" href="/path/to/critical.css" as="style" /> */}

        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "OnlineStore",
              name: "EStoreFront",
              url: "https://www.estorefront.com",
              logo: "https://www.estorefront.com/assets/images/logo.png", // Replace with your logo path
              description:
                "EStoreFront is your one-stop online store offering a wide range of quality products for all your needs.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "123 ECommerce Street", // Replace with your business address
                addressLocality: "City",
                addressRegion: "State",
                postalCode: "12345",
                addressCountry: "US", // Replace with your country
              },
              sameAs: [
                "https://www.facebook.com/estorefront", // Replace with your social media URLs
                "https://www.twitter.com/estorefront",
                "https://www.instagram.com/estorefront",
              ],
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
              position="top-right"
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
