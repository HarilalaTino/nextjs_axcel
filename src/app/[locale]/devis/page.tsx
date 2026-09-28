'use client';

import { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, CheckCircle2, Mail, MessageSquareText, Phone, UserRound, AlertCircle } from 'lucide-react';
import TopMenu from '@/components/ui/home/top-menu';
import NavMenu, { NAV_ITEMS } from '@/components/layout/header';

type Origin = 'malgache' | 'etranger';

type FormState = {
  nom: string;
  phone: string;
  whatsapp: string;
  email: string;
  demande: string;
  message: string;
  domicilierAxcel: boolean;
};

const frenchRequestOptions = [
  { value: 'sole-proprietorship-creation', label: "Création d'entreprise individuelle" },
  { value: 'sarl-creation', label: 'Création société SARL' },
  { value: 'sarlu-creation', label: 'Création société SARLU' },
  { value: 'ngo-creation', label: 'Création ONG' },
  { value: 'association-creation', label: 'Création Association' },
  { value: 'domiciliation', label: 'Domiciliation' },
  { value: 'meeting-room', label: 'Location de salle de réunion' },
  { value: 'recruitment', label: 'Recrutement' },
  { value: 'courier-diploma-retrieval', label: 'Récupération de certificats, diplômes et relevés de notes' },
  { value: 'courier-translation-retrieval', label: 'Récupération et traduction de documents administratifs' },
  { value: 'courier-certificates-retrieval', label: 'Récupération des certificats administratifs' },
  { value: 'courier-automobile-procedure', label: 'Procédures administratives pour l\'automobile' },
  { value: 'autres', label: 'Autre demande' },
] as const;

const getFrenchRequestLabel = (slug: string) => frenchRequestOptions.find((option) => option.value === slug)?.label ?? slug;

const getInitialForm = (type: string | null): FormState => ({
  nom: '',
  phone: '',
  whatsapp: '',
  email: '',
  demande: getInitialDemande(type),
  message: '',
  domicilierAxcel: false,
});

function getInitialDemande(type: string | null): string {
  const defaultValue = frenchRequestOptions[0].value;
  if (!type) return defaultValue;

  const matchingOption = frenchRequestOptions.find((option) => option.value === type);
  return matchingOption ? matchingOption.value : defaultValue;
}

const getRequestValueFromHref = (href: string): string => {
  const mapping: Record<string, string> = {
    '/creation-entreprise-individuelle': 'sole-proprietorship-creation',
    '/creation-societe-sarl-sarlu': 'sarl-creation',
    '/creation-sa-sau-sci': 'sarlu-creation',
    '/creation-ong-association': 'ngo-creation',
    '/creation-association-cultuelle': 'association-creation',
    '/domiciliation': 'domiciliation',
    '/salle-de-reunion': 'meeting-room',
    '/recrutement': 'recruitment',
    '/recuperation-diplome-releves': 'courier-diploma-retrieval',
    '/recuperation-traduction-document': 'courier-translation-retrieval',
    '/certificat-consommabilite-et-mise-en-commerce': 'courier-certificates-retrieval',
    '/toutes-autres-recuperations-et-certifications': 'autres',
  };

  return mapping[href] ?? 'autres';
};

type FieldErrors = Partial<Record<'nom' | 'phone' | 'demande', string>>;

export default function QuotePage() {
  const t = useTranslations('QuotePage');
  const navT = useTranslations('Nav');
  const searchParams = useSearchParams();
  const requestedType = searchParams.get('type');
  const requestOptions: Array<{ value: string; label: string }> = [
    { value: 'sole-proprietorship-creation', label: t('requestOptions.soleProprietorshipCreation') },
    { value: 'sarl-creation', label: t('requestOptions.sarlCreation') },
    { value: 'sarlu-creation', label: t('requestOptions.sarluCreation') },
    { value: 'ngo-creation', label: t('requestOptions.ngoCreation') },
    { value: 'association-creation', label: t('requestOptions.associationCreation') },
    { value: 'domiciliation', label: t('requestOptions.domiciliation') },
    { value: 'meeting-room', label: t('requestOptions.meetingRoom') },
    { value: 'recruitment', label: t('requestOptions.recruitment') },
    { value: 'courier-diploma-retrieval', label: t('requestOptions.courierDiplomaRetrieval') },
    { value: 'courier-translation-retrieval', label: t('requestOptions.courierTranslationRetrieval') },
    { value: 'courier-certificates-retrieval', label: t('requestOptions.courierCertificatesRetrieval') },
    { value: 'courier-automobile-procedure', label: t('requestOptions.courierAutomobileProcedure') },
    { value: 'autres', label: t('requestOptions.autres') },
  ];

  const requestGroups = NAV_ITEMS.filter(
    (item) => item.href !== '/a-propos' && item.href !== '/contact',
  ).map((item) => ({
    key: item.label,
    label: navT(item.label),
    options: (item.submenu?.length
      ? item.submenu.map((subItem) => ({
          id: `${item.label}-${subItem.href}`,
          label: navT(subItem.label),
          value: getRequestValueFromHref(subItem.href),
          href: subItem.href,
        }))
      : [{
          id: `${item.label}-${item.href}`,
          label: navT(item.label),
          value: getRequestValueFromHref(item.href),
          href: item.href,
        }]
    ).filter((option) => option.value && requestOptions.some((request) => request.value === option.value)),
  }));

  // Liste à plat de toutes les options, avec leur groupe
  const allOptions = requestGroups.flatMap((group) =>
    group.options.map((option) => ({
      ...option,
      groupKey: group.key,
      groupLabel: group.label,
    })),
  );

  const getInitialSelection = (value: string) =>
    allOptions.find((option) => option.value === value) ?? allOptions[0];

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(
    () => getInitialSelection(getInitialDemande(requestedType))?.id ?? null,
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    () => getInitialSelection(getInitialDemande(requestedType))?.groupKey ?? null,
  );

  const originOptions: Array<{ value: Origin; label: string; description: string }> = [
    {
      value: 'malgache',
      label: t('origin.malgache'),
      description: t('origin.malgacheDescription'),
    },
    {
      value: 'etranger',
      label: t('origin.etranger'),
      description: t('origin.etrangerDescription'),
    },
  ];
  const [origin, setOrigin] = useState<Origin | null>(null);
  const [form, setForm] = useState<FormState>(() => getInitialForm(requestedType));
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const validateField = (field: keyof FormState, value: string): string | null => {
    if (field === 'nom') {
      const trimmed = value.trim();
      if (!trimmed) return t('errors.fullNameRequired');
      if (trimmed.length < 2) return t('errors.fullNameMinLength');
      return null;
    }

    if (field === 'phone') {
      const trimmed = value.trim();
      if (!trimmed) return t('errors.phoneRequired');
      if (!/^(?:\+?[0-9\s().-]{8,20})$/.test(trimmed)) return t('errors.phoneInvalid');
      return null;
    }

    if (field === 'demande') {
      if (!value || !requestOptions.some((option) => option.value === value)) {
        return t('errors.requestTypeRequired');
      }
      return null;
    }

    return null;
  };

  const validateForm = (): boolean => {
    const nextErrors: FieldErrors = {
      nom: validateField('nom', form.nom) ?? undefined,
      phone: validateField('phone', form.phone) ?? undefined,
      demande: validateField('demande', form.demande) ?? undefined,
    };

    setFieldErrors(nextErrors);
    return !Object.values(nextErrors).some((message) => Boolean(message));
  };

  const handleInputChange = (
    field: keyof FormState,
    value: string,
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field === 'nom' || field === 'phone' || field === 'demande') {
      const errorMessage = validateField(field, value);
      setFieldErrors((prev) => ({
        ...prev,
        [field]: errorMessage ?? undefined,
      }));
    }
    setSubmitted(false);
    setError(null);
  };

  const handleToggleChange = (field: keyof FormState, value: boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSubmitted(false);
    setError(null);
  };

  // Sélection d'une option par son id unique (et non par sa value, qui peut être partagée)
  const handleSelectOption = (option: { id: string; value: string }) => {
    setSelectedOptionId(option.id);
    handleInputChange('demande', option.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!origin) {
      setError(t('errors.originRequired'));
      return;
    }

    if (!validateForm()) {
      setError(t('errors.formInvalid'));
      return;
    }

    const captchaToken = recaptchaRef.current?.getValue();
    if (!captchaToken) {
      setCaptchaError(t('errors.captchaRequired'));
      return;
    }
    setCaptchaError(null);

    // Pour les options qui partagent la valeur 'autres', on précise le sous-service choisi
    const selectedOption = allOptions.find((option) => option.id === selectedOptionId);

    const payload = {
      ...form,
      demande:
        selectedOption && selectedOption.value === 'autres'
          ? `${selectedOption.groupLabel} - ${selectedOption.label}`
          : getFrenchRequestLabel(form.demande),
      origin,
      captchaToken,
    };

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/devis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || t('errors.generic'));
      }

      setSubmitted(true);
      setForm(getInitialForm(requestedType));
      const initial = getInitialSelection(getInitialDemande(requestedType));
      setSelectedOptionId(initial?.id ?? null);
      setSelectedCategory(initial?.groupKey ?? null);
      setOrigin(null);
      recaptchaRef.current?.reset();
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : t('errors.unknown');
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
              <h1 className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
                {t('eyebrow')}
              </h1>
              <h2 className="mt-3 text-3xl font-black text-primary sm:text-4xl">
                {t('title')}
              </h2>
              <p className="mt-3 text-sm text-slate-600 sm:text-base">
                {t('subtitle')}
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
                    className={`rounded-2xl border p-5 text-left transition-all duration-200 ${selected
                        ? 'border-secondary bg-secondary/5 shadow-md shadow-secondary/10'
                        : 'border-slate-200 bg-white hover:border-secondary/60 hover:bg-slate-50'
                      }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-lg font-bold text-primary">{option.label}</span>
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${selected ? 'border-secondary bg-secondary' : 'border-slate-300 bg-white'
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
              <form onSubmit={handleSubmit} noValidate className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
                      <UserRound className="h-4 w-4 text-secondary" />
                      {t('form.fullName')}<span className='text-red-500'>*</span>
                    </span>
                    <input
                      type="text"
                      value={form.nom}
                      onChange={(event) => handleInputChange('nom', event.target.value)}
                      aria-invalid={Boolean(fieldErrors.nom)}
                      className={`w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-secondary/20 ${fieldErrors.nom
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                          : 'border-slate-200 focus:border-secondary focus:ring-secondary/20'
                        }`}
                    />
                    {fieldErrors.nom && <p className="mt-1 text-xs text-red-600">{fieldErrors.nom}</p>}
                  </label>

                  <label className="block">
                    <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
                      <Phone className="h-4 w-4 text-secondary" />
                      {t('form.phone')}<span className='text-red-500'>*</span>
                    </span>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(event) => handleInputChange('phone', event.target.value)}
                      aria-invalid={Boolean(fieldErrors.phone)}
                      className={`w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-secondary/20 ${fieldErrors.phone
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                          : 'border-slate-200 focus:border-secondary focus:ring-secondary/20'
                        }`}
                    />
                    {fieldErrors.phone && <p className="mt-1 text-xs text-red-600">{fieldErrors.phone}</p>}
                  </label>

                  <label className="block">
                    <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
                      <Phone className="h-4 w-4 text-secondary" />
                      WhatsApp
                    </span>
                    <input
                      type="tel"
                      value={form.whatsapp}
                      onChange={(event) => handleInputChange('whatsapp', event.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
                      <Mail className="h-4 w-4 text-secondary" />
                      {t('form.email')}
                    </span>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(event) => handleInputChange('email', event.target.value)}
                      placeholder={t('form.emailPlaceholder')}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                    />
                  </label>

                  <div className="block md:col-span-2">
                    <span className="mb-3 block text-sm font-semibold text-primary">
                      {t('form.requestType')} <span className='text-red-500'>*</span>
                    </span>

                    <div className="flex flex-wrap gap-2.5">
                      {requestGroups.map((group) => {
                        const isSelected = selectedCategory === group.key;

                        return (
                          <button
                            key={group.key}
                            type="button"
                            onClick={() => {
                              setSelectedCategory(group.key);
                              const first = group.options[0];
                              if (first) handleSelectOption(first);
                            }}
                            className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                              isSelected
                                ? 'border-secondary bg-secondary text-white shadow-sm'
                                : 'border-slate-200 bg-white text-primary hover:border-secondary/60 hover:text-secondary'
                            }`}
                          >
                            {group.label}
                          </button>
                        );
                      })}
                    </div>

                    {selectedCategory && (
                      <div className="mt-4 grid gap-2 sm:grid-cols-2">
                        {requestGroups
                          .find((group) => group.key === selectedCategory)
                          ?.options.map((option) => {
                            const isOptionSelected = selectedOptionId === option.id;

                            return (
                              <button
                                key={option.id}
                                type="button"
                                onClick={() => handleSelectOption(option)}
                                className={`rounded-xl border px-3 py-2.5 text-left text-sm transition-all duration-200 ${
                                  isOptionSelected
                                    ? 'border-secondary bg-secondary/5 text-primary shadow-sm'
                                    : 'border-slate-200 bg-white text-slate-700 hover:border-secondary/60 hover:text-secondary'
                                }`}
                              >
                                {option.label}
                              </button>
                            );
                          })}
                      </div>
                    )}

                    {fieldErrors.demande && <p className="mt-2 text-xs text-red-600">{fieldErrors.demande}</p>}
                  </div>

                  <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3 md:col-span-2">
                    <span className="text-sm font-semibold text-primary">
                      {t('form.RegisteredOffice')}
                    </span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={form.domicilierAxcel}
                      onClick={() => handleToggleChange('domicilierAxcel', !form.domicilierAxcel)}
                      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 ${form.domicilierAxcel ? 'bg-secondary' : 'bg-slate-300'
                        }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${form.domicilierAxcel ? 'translate-x-6' : 'translate-x-1'
                          }`}
                      />
                    </button>
                  </div>

                  <label className="block md:col-span-2">
                    <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
                      <MessageSquareText className="h-4 w-4 text-secondary" />
                      {t('form.message')}
                    </span>
                    <textarea
                      value={form.message}
                      onChange={(event) => handleInputChange('message', event.target.value)}
                      rows={8}
                      maxLength={1200}
                      placeholder={t('form.messagePlaceholder')}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                    />
                  </label>

                  {/*reCAPTCHA*/}
                  <div className="md:col-span-2">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                      onChange={() => setCaptchaError(null)}
                    />
                    {captchaError && <p className="mt-2 text-xs text-red-600">{captchaError}</p>}
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-white transition hover:bg-secondary/90 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? t('form.submitting') : t('form.submit')}
                    {!isSubmitting && <ArrowRight className="h-4 w-4" />}
                  </button>
                </div>
              </form>
            )}

            {error && (
              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                <div>
                  <p className="font-semibold">{t('errors.title')}</p>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            )}

            {submitted && (
              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                <div>
                  <p className="font-semibold">{t('success.title')}</p>
                  <p className="text-sm">
                    {t('success.description')}
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
