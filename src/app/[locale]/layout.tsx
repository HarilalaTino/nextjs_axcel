import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/layout/footer";
import "../globals.css";
import { routing } from "@/i18n/routing";
import { notFound } from "next/dist/client/components/navigation";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "Axcel Company | Services professionnels aux entreprises",
    template: "%s | Axcel Company",
  },
  description:
    "Axcel Company accompagne les entrepreneurs avec des services de création d'entreprise, domiciliation, conseil et assistance à Madagascar.",
  keywords: [
    "Axcel Company",
    "création entreprise Madagascar",
    "domiciliation entreprise",
    "conseil entreprise",
    "assistance administrative",
  ],
  authors: [{ name: "Axcel Company" }],
  creator: "Axcel Company",
  publisher: "Axcel Company",
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    shortcut: ["/logo.png"],
    apple: [{ url: "/logo.png", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Axcel Company",
    title: "Axcel Company | Services professionnels aux entreprises",
    description:
      "Création d'entreprise, domiciliation, conseil et assistance pour les entrepreneurs à Madagascar.",
    images: [
      {
        url: "/images/home/hero-bg-1.jpg",
        width: 1200,
        height: 630,
        alt: "Axcel Company, services professionnels aux entreprises",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Axcel Company | Services professionnels aux entreprises",
    description:
      "Création d'entreprise, domiciliation, conseil et assistance à Madagascar.",
    images: ["/images/home/hero-bg-1.jpg"],
  },
  robots: {
    index: false,
    follow: false,
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!routing.locales.includes(locale as any)) notFound();

  const messages = await getMessages();
  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
         <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Footer />
      </body>
    </html>
  );
}