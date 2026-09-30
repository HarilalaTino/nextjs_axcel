"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export default function ContactCTA() {
  const t = useTranslations('Home');

  return (
    <section className="relative mx-auto mt-12 w-2/3 2xl:w-[85%] 2xl:max-w-7xl overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-primary to-[#14315c] px-4 py-12 text-center sm:mt-16 sm:rounded-[1.5rem] sm:px-6 sm:py-16 md:mt-20 md:rounded-[2rem] md:px-10 md:py-20 lg:px-16
">
      <span className="text-3xl font-bold text-white sm:text-4xl">
        {t('contact.title')}
      </span>

      <p className="mx-auto mt-4 max-w-md text-slate-300">
        {t('contact.description')}
      </p>

      <div className="relative mt-8 inline-block">
        <Link
          href="/contact"
          className="
            flex
            items-center
            gap-2
            rounded-full
            bg-white
            px-6
            py-3
            font-semibold
            text-primary
            shadow-lg shadow-primary/20
            transition-all duration-300
            hover:-translate-y-1
            hover:bg-secondary
            hover:text-white
            hover:shadow-xl hover:shadow-secondary/30
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-white
            focus-visible:ring-offset-2
            focus-visible:ring-offset-primary
          "
        >
          {t('contact.button')}
        </Link>
      </div>
    </section>
  );
}
