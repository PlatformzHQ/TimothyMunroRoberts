import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import JsonLd from "./components/seo/JsonLd";
import { SITE_URL, BIO_SHORT, personJsonLd, organizationsJsonLd, websiteJsonLd } from "./lib/seo";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const TITLE = "Timothy Munro Roberts — Technology Founder · Enterprise Architect · AI Platform Designer";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: BIO_SHORT,
  alternates: { canonical: "/" },
  keywords: [
    "Timothy Munro Roberts",
    "Tim Roberts",
    "SAVVIS founder",
    "Intira",
    "Savtira",
    "Phantom Entertainment",
    "Platformz",
    "FUR4",
    "enterprise architect",
    "cloud computing pioneer",
    "AI platform",
  ],
  authors: [{ name: "Timothy Munro Roberts", url: SITE_URL }],
  openGraph: {
    type: "profile",
    url: SITE_URL,
    siteName: TITLE,
    title: TITLE,
    description: BIO_SHORT,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Timothy Munro Roberts" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: BIO_SHORT,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} antialiased`} suppressHydrationWarning>
      <body className="grain">
        <JsonLd data={[personJsonLd, ...organizationsJsonLd, websiteJsonLd]} />
        <div className="aurora-bg" aria-hidden />
        {children}
      </body>
    </html>
  );
}
