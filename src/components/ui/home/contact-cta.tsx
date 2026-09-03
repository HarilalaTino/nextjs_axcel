"use client";

import Link from "next/link";
export default function ContactCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-primary via-primary to-[#14315c] px-6 py-20 text-center">
      <h2 className="text-3xl font-bold text-white sm:text-4xl">
        Envie d&apos;échanger avec nous ?
      </h2>

      <p className="mx-auto mt-4 max-w-md text-slate-300">
        Un projet, une question ou besoin d&apos;accompagnement ? On vous répond le plus vite possible
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
          Nous contacter
        </Link>
      </div>
    </section>
  );
}
