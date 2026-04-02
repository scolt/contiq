import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://contiq.app"
  ),
  applicationName: "Contiq",
  title: {
    default: "Contiq",
    template: "%s | Contiq",
  },
  description:
    "AI-powered document intelligence. Chat with your documents, extract insights, and manage knowledge — all in one place.",
  openGraph: {
    type: "website",
    siteName: "Contiq",
    title: {
      default: "Contiq",
      template: "%s | Contiq",
    },
    description:
      "AI-powered document intelligence. Chat with your documents, extract insights, and manage knowledge — all in one place.",
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: "Contiq",
      template: "%s | Contiq",
    },
    description:
      "AI-powered document intelligence. Chat with your documents, extract insights, and manage knowledge — all in one place.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="h-full">{children}</body>
    </html>
  );
}
