'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2, Mail, MessageSquareText, Phone, UserRound, AlertCircle } from 'lucide-react';
import TopMenu from '@/components/ui/home/top-menu';
import NavMenu from '@/components/layout/header';

type Origin = 'malgache' | 'etranger';

type FormState = {
  nom: string;
  phone: string;
  email: string;
  demande: string;
  message: string;
};

const requestOptions = [
  { value: 'creation-individuelle', label: "Création d'entreprise individuelle" },
  { value: 'creation-sarl-sarlu', label: 'Création société SARL / SARLU' },
  { value: 'creation-ong-association', label: 'Création ONG et Association' },
  { value: 'domiciliation', label: 'Domiciliation' },
  { value: 'location-salle-reunion', label: 'Location de salle de réunion' },
  { value: 'recrutement', label: 'Recrutement' },
  { value: 'service-coursier', label: 'Service de coursier' },
  { value: 'conseil-assistance', label: 'Conseil et assistance' },
  { value: 'other', label: 'Autres' },
];

const originOptions: Array<{ value: Origin; label: string; description: string }> = [
  {
    value: 'malgache',
    label: 'Malgache',
    description: 'Vous résidez ou êtes basé à Madagascar.',
  },
  {
    value: 'etranger',
    label: 'Étranger',
    description: 'Vous êtes un client international ou résident à l’étranger.',
  },
];

const initialForm: FormState = {
  nom: '',
  phone: '',
  email: '',
  demande: requestOptions[0].value,
  message: '',
};

export default function QuotePage() {
  const [origin, setOrigin] = useState<Origin | null>(null);
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    field: keyof FormState,
    value: string,
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSubmitted(false);
    setError(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!origin) {
      setError('Veuillez d’abord choisir votre origine.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/devis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          origin,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || 'Une erreur est survenue lors de l’envoi du devis.');
      }

      setSubmitted(true);
      setForm(initialForm);
      setOrigin(null);
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : 'Une erreur inconnue est survenue.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <TopMenu />
      <NavMenu />

      <main className="bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(21,32,57,0.08)] sm:p-8 lg:p-12">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
                Demande de devis
              </p>
              <h1 className="mt-3 text-3xl font-black text-primary sm:text-4xl">
                Choisissez votre origine puis décrivez votre besoin
              </h1>
              <p className="mt-3 text-sm text-slate-600 sm:text-base">
                Sélectionnez votre profil pour recevoir une réponse adaptée à votre situation.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {originOptions.map((option) => {
                const selected = origin === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setOrigin(option.value);
                      setSubmitted(false);
                    }}
                    className={`rounded-2xl border p-5 text-left transition-all duration-200 ${
                      selected
                        ? 'border-secondary bg-secondary/5 shadow-md shadow-secondary/10'
                        : 'border-slate-200 bg-white hover:border-secondary/60 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-lg font-bold text-primary">{option.label}</span>
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                          selected ? 'border-secondary bg-secondary' : 'border-slate-300 bg-white'
                        }`}
                      >
                        {selected && <span className="h-2 w-2 rounded-full bg-white" />}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-slate-600">{option.description}</p>
                  </button>
                );
              })}
            </div>

            {origin && (
              <form onSubmit={handleSubmit} className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
                      <UserRound className="h-4 w-4 text-secondary" />
                      Nom et prénom
                    </span>
                    <input
                      type="text"
                      value={form.nom}
                      onChange={(event) => handleInputChange('nom', event.target.value)}
                      placeholder="Ex : Rakoto Jean"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                      required
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
                      <Phone className="h-4 w-4 text-secondary" />
                      Numéro téléphone
                    </span>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(event) => handleInputChange('phone', event.target.value)}
                      placeholder="Ex : +261 34 00 000 00"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                      required
                    />
                  </label>

                  <label className="block md:col-span-2">
                    <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
                      <Mail className="h-4 w-4 text-secondary" />
                      Email
                    </span>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(event) => handleInputChange('email', event.target.value)}
                      placeholder="Ex : nom@email.com"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                      required
                    />
                  </label>

                  <label className="block md:col-span-2">
                    <span className="mb-2 text-sm font-semibold text-primary">Type de demande</span>
                    <select
                      value={form.demande}
                      onChange={(event) => handleInputChange('demande', event.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                    >
                      {requestOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block md:col-span-2">
                    <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
                      <MessageSquareText className="h-4 w-4 text-secondary" />
                      Message
                    </span>
                    <textarea
                      value={form.message}
                      onChange={(event) => handleInputChange('message', event.target.value)}
                      rows={5}
                      placeholder="Décrivez votre besoin, vos objectifs ou les démarches à réaliser..."
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                    />
                  </label>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-sm text-slate-600">
                    {origin === 'malgache' ? 'Client local' : 'Client international'}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-white transition hover:bg-secondary/90 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer la demande'}
                    {!isSubmitting && <ArrowRight className="h-4 w-4" />}
                  </button>
                </div>
              </form>
            )}

            {error && (
              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                <div>
                  <p className="font-semibold">L’envoi du devis a échoué.</p>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            )}

            {submitted && (
              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                <div>
                  <p className="font-semibold">Votre demande a bien été enregistrée.</p>
                  <p className="text-sm">
                    Nous reviendrons vers vous rapidement pour vous proposer un devis adapté à votre demande.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
