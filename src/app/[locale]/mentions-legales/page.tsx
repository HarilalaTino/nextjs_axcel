import { getTranslations } from 'next-intl/server';
import { Mail, MapPin, Phone } from 'lucide-react';
import NavMenu from '@/components/layout/header';
import TopMenu from '@/components/ui/home/top-menu';
import { Link } from '@/i18n/navigation';
import {
  COMPANY_ADDRESS,
  EMAIL_ADDRESS,
  PRIMARY_PHONE_NUMBER,
  SECONDARY_PHONE_NUMBER,
} from '@/utils/constants';

export default async function LegalNoticePage() {
  const t = await getTranslations('LegalNotice');

  return (
    <>
      <TopMenu />
      <NavMenu />
      <main className="bg-slate-50">
        <section className="mx-auto max-w-5xl px-6 py-16 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              {t('eyebrow')}
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-primary sm:text-5xl">
              {t('title')}
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">{t('intro')}</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-xl font-bold text-primary">{t('publisher.title')}</h2>
              <dl className="mt-5 space-y-4 text-sm leading-6 text-slate-600">
                <div>
                  <dt className="font-semibold text-primary">{t('publisher.nameLabel')}</dt>
                  <dd>{t('publisher.name')}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-primary">{t('publisher.activityLabel')}</dt>
                  <dd>{t('publisher.activity')}</dd>
                </div>
              </dl>
            </section>

            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-xl font-bold text-primary">{t('contact.title')}</h2>
              <div className="mt-5 space-y-4 text-sm leading-6 text-slate-600">
                <p className="flex items-start gap-3">
                  <MapPin className="mt-1 shrink-0 text-secondary" size={18} aria-hidden="true" />
                  <span>{COMPANY_ADDRESS}</span>
                </p>
                <p className="flex items-start gap-3">
                  <Mail className="mt-1 shrink-0 text-secondary" size={18} aria-hidden="true" />
                  <a className="hover:text-secondary" href={`mailto:${EMAIL_ADDRESS}`}>
                    {EMAIL_ADDRESS}
                  </a>
                </p>
                <p className="flex items-start gap-3">
                  <Phone className="mt-1 shrink-0 text-secondary" size={18} aria-hidden="true" />
                  <span>
                    <a className="hover:text-secondary" href={`tel:${PRIMARY_PHONE_NUMBER}`}>
                      {PRIMARY_PHONE_NUMBER}
                    </a>
                    <br />
                    <a className="hover:text-secondary" href={`tel:${SECONDARY_PHONE_NUMBER}`}>
                      {SECONDARY_PHONE_NUMBER}
                    </a>
                  </span>
                </p>
              </div>
            </section>
          </div>

          <div className="mt-6 space-y-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
            <section>
              <h2 className="text-xl font-bold text-primary">{t('hosting.title')}</h2>
              <p className="mt-3 leading-7 text-slate-600">{t('hosting.content')}</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-primary">{t('intellectualProperty.title')}</h2>
              <p className="mt-3 leading-7 text-slate-600">{t('intellectualProperty.content')}</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-primary">{t('personalData.title')}</h2>
              <p className="mt-3 leading-7 text-slate-600">{t('personalData.content')}</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-primary">{t('liability.title')}</h2>
              <p className="mt-3 leading-7 text-slate-600">{t('liability.content')}</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-primary">{t('law.title')}</h2>
              <p className="mt-3 leading-7 text-slate-600">{t('law.content')}</p>
            </section>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="rounded-md bg-secondary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-secondary/90"
            >
              {t('contactButton')}
            </Link>
            <Link
              href="/"
              className="rounded-md border border-slate-300 px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:border-secondary hover:text-secondary"
            >
              {t('homeButton')}
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
