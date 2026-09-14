'use client';

import {
  COMPANY_ADDRESS,
  EMAIL_ADDRESS,
  FACEBOOK_COMPANY,
  LOCALISATION,
  PRIMARY_PHONE_NUMBER,
} from '@/utils/constants';
import { removeSpaces } from '@/utils/hooks';
import { useTranslations } from 'next-intl';

const phoneParsed = removeSpaces(PRIMARY_PHONE_NUMBER);

const CONTACT = {
  phone: { display: PRIMARY_PHONE_NUMBER, href: `tel:${phoneParsed}` },
  email: { display: EMAIL_ADDRESS, href: `mailto:${EMAIL_ADDRESS}` },
  whatsapp: { display: PRIMARY_PHONE_NUMBER, href: `https://wa.me/${phoneParsed}` },
  facebook: { display: 'Axel Company', href: FACEBOOK_COMPANY },
  address: COMPANY_ADDRESS,
  mapEmbedSrc: LOCALISATION,
};

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.6 10.8c1.3 2.6 3.4 4.7 6 6l2-2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1v3.4c0 .6-.4 1-1 1C10.9 20.5 3.5 13.1 3.5 4.5c0-.6.4-1 1-1H8c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1l-2 2Z"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.5 6.5h17v11h-17v-11Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7l8 6 8-6" />
    </svg>
  );
}

function WhatsappIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M17.5 14.4c-.3-.1-1.6-.8-1.9-.9-.3-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.1.2-.3.2-.6.1-.3-.1-1.2-.4-2.2-1.4-.8-.7-1.4-1.6-1.5-1.9-.2-.3 0-.4.1-.6l.4-.5c.1-.2.1-.3.2-.5 0-.2 0-.3 0-.5-.1-.1-.6-1.5-.9-2.1-.2-.5-.5-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3 4.8 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.6-.7 1.9-1.3.2-.6.2-1.1.2-1.3-.1-.1-.3-.2-.5-.3Z" />
      <path d="M12 2.5c-5.2 0-9.5 4.2-9.5 9.5 0 1.7.4 3.3 1.3 4.7L2.5 21.5l4.9-1.3c1.3.7 2.9 1.1 4.6 1.1 5.2 0 9.5-4.2 9.5-9.5S17.2 2.5 12 2.5Zm0 17.3c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-2.9.8.8-2.8-.2-.3C4.3 14.8 3.8 13.4 3.8 12c0-4.5 3.7-8.2 8.2-8.2s8.2 3.7 8.2 8.2-3.7 8.2-8.2 8.2Z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M13.5 21.5v-8.2h2.7l.4-3.2h-3.1V8c0-.9.3-1.6 1.6-1.6h1.7V3.5c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.5H7.5v3.2H10v8.2h3.5Z" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-6.3 7-11.5A7 7 0 0 0 5 9.5C5 14.7 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type ContactRowProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
};

function ContactRow({ icon, label, value, href }: ContactRowProps) {
  return (
    <a
      href={href}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="group flex items-center gap-4 border-l-2 border-[#ff6341]/40 py-3 pl-5 transition-all hover:border-[#ff6341] hover:pl-7"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#152039] text-white transition-colors group-hover:bg-[#ff6341]">
        {icon}
      </span>
      <span className="flex flex-col">
        <span className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</span>
        <span className="font-medium text-[#152039] group-hover:text-[#ff6341]">{value}</span>
      </span>
    </a>
  );
}

export default function InfoContact() {
  const t = useTranslations('ContactPage');

  return (
    <main>
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-12">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.15fr] lg:items-start">
          <div>
            <h1 className="text-2xl font-extrabold leading-tight text-primary sm:text-3xl lg:text-4xl">
              {t('title')}
            </h1>
            <div className="mt-4 h-1 w-16 bg-secondary"></div>
            <p className="mt-6 mb-10 text-sm text-primary/70 sm:text-base">{t('subtitle')}</p>

            <div className="mt-10 flex flex-col gap-1">
              <ContactRow icon={<PhoneIcon />} label={t('phone')} value={CONTACT.phone.display} href={CONTACT.phone.href} />
              <ContactRow icon={<MailIcon />} label={t('email')} value={CONTACT.email.display} href={CONTACT.email.href} />
              <ContactRow icon={<WhatsappIcon />} label={t('whatsapp')} value={CONTACT.whatsapp.display} href={CONTACT.whatsapp.href} />
              <ContactRow icon={<FacebookIcon />} label={t('facebook')} value={CONTACT.facebook.display} href={CONTACT.facebook.href} />
              <ContactRow icon={<PinIcon />} label={t('address')} value={CONTACT.address} />
            </div>
          </div>

          <div className="overflow-hidden rounded-sm border border-[#152039]/10 bg-white">
            <div className="overflow-hidden rounded-sm border border-[#152039]/10 bg-white">
              <iframe
                title={t('mapTitle')}
                src={CONTACT.mapEmbedSrc}
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="aspect-[4/3] w-full lg:aspect-auto lg:h-[520px]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-center gap-10 px-6 py-10 md:flex-row md:items-center md:px-12">
          <p className="text-2xl font-extrabold leading-tight text-primary sm:text-3xl ">{t('ctaTitle')}</p>

          <a
            href={CONTACT.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-medium text-white transition-colors hover:bg-[#20BD5A]"
          >
            <WhatsappIcon />
            {t('ctaButton')}
          </a>
        </div>
      </section>
    </main>
  );
}
