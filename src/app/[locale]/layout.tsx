import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/layout/footer";
import "../globals.css";
import { routing } from "@/i18n/routing";
import { notFound } from "next/dist/client/components/navigation";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import ScrollToTop from "@/components/ui/shared/scroll-top";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEnglish = locale === "en";
  const title = isEnglish
    ? "Axcel Company | Professional Business Services"
    : "Axcel Company | Services professionnels aux entreprises";
  const description = isEnglish
    ? "Axcel Company supports entrepreneurs with business creation, domiciliation, consulting, and administrative assistance in Madagascar."
    : "Axcel Company accompagne les entrepreneurs avec des services de création d'entreprise, domiciliation, conseil et assistance à Madagascar.";
  const socialDescription = isEnglish
    ? "Business creation, domiciliation, consulting, and support for entrepreneurs in Madagascar."
    : "Création d'entreprise, domiciliation, conseil et assistance pour les entrepreneurs à Madagascar.";

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    ),
    title: {
      default: title,
      template: "%s | Axcel Company",
    },
    description,
    keywords: isEnglish
      ? [
        "Axcel Company",
        "business creation Madagascar",
        "business domiciliation",
        "business consulting",
        "administrative assistance",
      ]
      : [
        "Axcel Company",
        "création entreprise Madagascar",
        "domiciliation entreprise",
        "conseil entreprise",
        "assistance administrative",
      ],
    authors: [{ name: "Axcel Company" }],
    creator: "Axcel Company",
    publisher: "Axcel Company",
    openGraph: {
      type: "website",
      locale: isEnglish ? "en_US" : "fr_FR",
      siteName: "Axcel Company",
      title,
      description: socialDescription,
      images: [
        {
          url: "/images/og/og-default.jpg",
          width: 860,
          height: 484,
          alt: "Axcel Company",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: isEnglish
        ? "Business creation, domiciliation, consulting, and assistance in Madagascar."
        : "Création d'entreprise, domiciliation, conseil et assistance à Madagascar.",
      images: ["/images/og/og-default.jpg"],
    },
    robots: {
      index: process.env.NEXT_PUBLIC_SITE_URL === "https://axcel.mg",
      follow: process.env.NEXT_PUBLIC_SITE_URL === "https://axcel.mg",
    },
  };
}

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
          <ScrollToTop />
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}