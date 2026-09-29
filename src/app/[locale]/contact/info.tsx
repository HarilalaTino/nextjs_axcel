"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  Copy,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";
import { COMPANY_ADDRESS, FACEBOOK_COMPANY, LOCALISATION } from "@/utils/constants";
import { useTranslations } from "next-intl";

const CONTACT = {
  phones: [
    { number: "+261 38 77 777 76", label: "main" },
    { number: "+261 34 11 918 40", label: "manager" },
    { number: "+261 38 77 770 06", label: "commercial" },
  ] as { number: string; label?: string }[],
  whatsapp: "+261 34 11 918 40",
  email: "contact@axcel.mg",
  facebookLabel: "Axel Company",
  facebookHref: FACEBOOK_COMPANY,
  address: COMPANY_ADDRESS,
  mapEmbed: LOCALISATION,
};

const digits = (n: string) => n.replace(/\D/g, "");
const telHref = (n: string) => `tel:+${digits(n)}`;
const whatsappHref = (n: string) => `https://wa.me/${digits(n)}`;

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copié" : `Copier ${label}`}
      className="grid size-9 shrink-0 place-items-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
    >
      {copied ? <Check className="size-4 text-emerald-600" /> : <Copy className="size-4" />}
    </button>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M13.5 21.5v-8.2h2.7l.4-3.2h-3.1V8c0-.9.3-1.6 1.6-1.6h1.7V3.5c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.5H7.5v3.2H10v8.2h3.5Z" />
    </svg>
  );
}

function Row({
  icon: Icon,
  title,
  value,
  href,
  copyValue,
  external,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
  href: string;
  copyValue?: string;
  external?: boolean;
}) {
  const t = useTranslations('ContactPage');
  return (
    <div className="group flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 pr-3 transition hover:border-slate-300 hover:shadow-sm">
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="flex min-w-0 flex-1 items-center gap-4 rounded-xl p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500"
      >
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-700 transition group-hover:bg-orange-500 group-hover:text-white">
          <Icon className="size-5" />
        </span>
        <span className="min-w-0">
          <span className="block text-sm text-slate-500">{title}</span>
          <span className="block truncate font-semibold text-slate-900">{value}</span>
        </span>
      </a>
      {copyValue ? (
        <CopyButton value={copyValue} label={title.toLowerCase()} />
      ) : (
        <ArrowUpRight className="mr-2 size-4 shrink-0 text-slate-400 transition group-hover:text-slate-900" />
      )}
    </div>
  );
}

function PhoneCard({ phones }: { phones: { number: string; label?: string }[] }) {
  const multiple = phones.length > 1;
  const t = useTranslations('ContactPage');
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-2 pr-3 transition hover:border-slate-300 hover:shadow-sm">
      <div className="flex items-start gap-4 p-2">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-700">
          <Phone className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <span className="block text-sm text-slate-500">
            {multiple ? "Téléphones" : "Téléphone"}
          </span>
          <ul className="mt-0.5 divide-y divide-slate-100">
            {phones.map((p) => (
              <li key={p.number} className="flex items-center justify-between gap-2 py-1.5 first:pt-0 last:pb-0">
                <a
                  href={telHref(p.number)}
                  className="min-w-0 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500"
                >
                  <span className="block truncate font-semibold text-slate-900 hover:text-orange-600">
                    {p.number}
                  </span>
                  {p.label && <span className="block text-xs text-slate-500">{t(p.label)}</span>}
                </a>
                <CopyButton value={p.number} label={p.number} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function ContactSection() {
  const contactTranslate =  useTranslations('ContactPage');
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8">
      <div className="max-w-xl">
        <h2 className="text-2xl font-extrabold leading-tight text-primary sm:text-3xl xl:text-4xl">
          {contactTranslate('title')}
        </h2>
        <p className="mt-4 text-sm text-primary/70 sm:text-base">
          {contactTranslate('subtitle')}
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-5">
        {/* Colonne canaux */}
        <div className="flex flex-col gap-3 lg:col-span-2">
          {/* Canal principal */}
          <a
            href={whatsappHref(CONTACT.whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-3xl bg-emerald-500 p-6 text-white transition hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            <MessageCircle
              aria-hidden
              className="absolute -right-6 -top-6 size-36 rotate-12 text-white/15"
              strokeWidth={1.5}
            />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-sm font-medium">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-white opacity-75 motion-reduce:hidden" />
                  <span className="relative inline-flex size-2 rounded-full bg-white" />
                </span>
                {contactTranslate('whatsupEyebrown')}
              </span>
              <p className="mt-5 text-2xl font-bold">{contactTranslate('ctaButton')}</p>
              <p className="mt-1 text-emerald-50">{CONTACT.whatsapp}</p>
              <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-emerald-700 transition group-hover:gap-3">
                  {contactTranslate("startConversation")}
                <ArrowUpRight className="size-4" />
              </span>
            </div>
          </a>

          <PhoneCard phones={CONTACT.phones} />
          <Row
            icon={Mail}
            title="Email"
            value={CONTACT.email}
            href={`mailto:${CONTACT.email}`}
            copyValue={CONTACT.email}
          />
          <Row
            icon={FacebookIcon}
            title="Facebook"
            value={CONTACT.facebookLabel}
            href={CONTACT.facebookHref}
            external
          />
        </div>

        {/* Carte */}
        <div className="relative min-h-[420px] overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 lg:col-span-3">
          <iframe
            title="Localisation Axcel Company"
            src={CONTACT.mapEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 size-full border-0 grayscale-[35%] transition hover:grayscale-0"
          />
        </div>
      </div>
    </section>
  );
}
