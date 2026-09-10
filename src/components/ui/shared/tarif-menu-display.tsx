import { Menu, TarifLigne } from "@/utils/service-data";
import { Wallet, Receipt, Clock, ArrowRight } from "lucide-react";

/**
 * TarifMenuDisplay — composant unique et incontournable pour afficher les
 * données d'un menu de service coursier (header + sous-menus + lignes de
 * tarif). Toutes les pages "coursier-..." l'utilisent, en lui passant
 * simplement le menu correspondant depuis lib/services-data.ts.
 *
 * Thème : primary #152039 (encre/marine) — secondary #ff6341 (corail).
 */
export function TarifMenuDisplay({ menu }: { menu: Menu }) {
  return (
    <main className="min-h-screen bg-[#f7f7f5]">
    
      {/* Contenu */}
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="space-y-12">
          {menu.sousMenus.map((sousMenu) => (
            <section key={sousMenu.slug}>
              <div className="flex items-baseline justify-between gap-4 border-b border-[#152039]/10 pb-3">
                <h2 className="text-base font-semibold text-[#152039]">
                  {sousMenu.titre}
                </h2>
                <span className="hidden shrink-0 text-xs text-[#152039]/40 sm:inline">
                  {sousMenu.resume}
                </span>
              </div>
              <p className="mt-2 text-sm text-[#152039]/60 sm:hidden">
                {sousMenu.resume}
              </p>

              <div className="mt-4 space-y-3">
                {sousMenu.lignes.map((ligne, i) => (
                  <TarifLigneItem key={i} ligne={ligne} />
                ))}
              </div>

              {sousMenu.note && (
                <p className="mt-3 border border-dashed border-[#152039]/20 bg-[#152039]/[0.03] p-4 text-sm text-[#152039]/60">
                  {sousMenu.note}
                </p>
              )}
            </section>
          ))}
        </div>

        {/* Appel à l'action */}
        <a
          href="#"
          className="group mt-12 inline-flex items-center gap-2 bg-[#ff6341] px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Demander ce service
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </main>
  );
}

function TarifLigneItem({ ligne }: { ligne: TarifLigne }) {
  return (
    <div className="relative border border-[#152039]/10 bg-white p-5 sm:p-6">
      <span className="absolute inset-y-0 left-0 w-1.5 bg-[#ff6341]" />

      <div className="pl-3">
        <h3 className="text-[15px] font-semibold tracking-tight text-[#152039]">
          {ligne.intitule}
        </h3>

        <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {ligne.honoraires && (
            <div className="flex items-start gap-2">
              <Wallet className="mt-0.5 h-4 w-4 shrink-0 text-[#152039]/40" />
              <div>
                <dt className="text-xs text-[#152039]/50">Honoraires</dt>
                <dd className="text-sm font-medium text-[#152039]">
                  {ligne.honoraires}
                </dd>
              </div>
            </div>
          )}
          {ligne.fraisAdministratifs && (
            <div className="flex items-start gap-2">
              <Receipt className="mt-0.5 h-4 w-4 shrink-0 text-[#152039]/40" />
              <div>
                <dt className="text-xs text-[#152039]/50">
                  Frais administratifs
                </dt>
                <dd className="text-sm font-medium text-[#152039]">
                  {ligne.fraisAdministratifs}
                </dd>
              </div>
            </div>
          )}
          {ligne.duree && (
            <div className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#ff6341]" />
              <div>
                <dt className="text-xs text-[#152039]/50">
                  Durée de traitement
                </dt>
                <dd className="text-sm font-medium text-[#ff6341]">
                  {ligne.duree}
                </dd>
              </div>
            </div>
          )}
        </dl>

        {ligne.total && (
          <div className="mt-4 flex items-baseline justify-between border-t border-dashed border-[#152039]/15 pt-3">
            <span className="text-xs uppercase tracking-wide text-[#152039]/50">
              Total
            </span>
            <span className="text-lg font-semibold text-[#152039]">
              {ligne.total}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
