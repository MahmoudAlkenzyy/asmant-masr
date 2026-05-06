import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Alexandria } from "next/font/google";
import { Providers } from "./components/shared/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Asmant Masr | أسمنت مصر",
    template: "%s | Asmant Masr",
  },
  description: "Asmant Masr is the leading platform for cement prices and construction news in Egypt. Stay updated with the latest market trends, producer prices, and industry updates.",
  keywords: ["cement", "Egypt", "construction", "building materials", "asmant masr", "أسمنت مصر", "أسعار الأسمنت", "شركات الأسمنت", "مقاولات"],
  authors: [{ name: "Asmant Masr" }],
  creator: "Asmant Masr",
  publisher: "Asmant Masr",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Asmant Masr | أسمنت مصر",
    description: "Asmant Masr is the leading platform for cement prices and construction news in Egypt.",
    url: "https://asmantmasr.com",
    siteName: "Asmant Masr",
    locale: "ar_EG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Asmant Masr | أسمنت مصر",
    description: "Asmant Masr is the leading platform for cement prices and construction news in Egypt.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const alex = Alexandria({
  subsets: ["latin", "arabic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-alexandria",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${alex.variable} ${geistSans.variable} ${geistMono.variable} ${alex.className} antialiased flex justify-start flex-col min-h-screen`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
