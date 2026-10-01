'use client';

import { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, CheckCircle2, Mail, MessageSquareText, Phone, UserRound, AlertCircle } from 'lucide-react';
import TopMenu from '@/components/ui/home/top-menu';
import NavMenu from '@/components/layout/header';

type Origin = 'malgache' | 'etranger' | 'non-specifie';
type SelectableOrigin = Exclude<Origin, 'non-specifie'>;

const ORIGIN_UNSPECIFIED: Origin = 'non-specifie';

type FormState = {
  nom: string;
  phone: string;
  whatsapp: string;
  email: string;
  demande: string; 
  message: string;
  domicilierAxcel: boolean;
};

type RequestOption = {
  slug: string;
  labelKey: string; 
};

type RequestCategory = {
  key: string;
  labelKey: string;
  options: RequestOption[];
  standalone?: boolean; 
};

type SpecialCategory = RequestCategory & { selectedKey: string };

/* --------------------------------------------------------------------------- */ 
/* Request catalog (categories -> subcategories) */ 
/* Each slug is unique: the selection is always done by slug. */ 
/* --------------------------------------------------------------------------- */
const REQUEST_CATALOG: RequestCategory[] = [
  {
    key: 'creation',
    labelKey: 'requestCategories.creation',
    options: [
      { slug: 'sole-proprietorship-creation', labelKey: 'requestOptions.soleProprietorshipCreation' },
      { slug: 'sarl-creation', labelKey: 'requestOptions.sarlCreation' },
      { slug: 'sarlu-creation', labelKey: 'requestOptions.sarluCreation' },
      { slug: 'for-profit-association', labelKey: 'requestOptions.forProfitAssociation' },
      { slug: 'non-profit-association', labelKey: 'requestOptions.nonProfitAssociation' },
      { slug: 'establishment-of-religious-association', labelKey: 'requestOptions.establishmentOfReligiousAssociation' },
      { slug: 'society-creation-sa', labelKey: 'requestOptions.societyCreationSa' },
      { slug: 'society-creation-sau', labelKey: 'requestOptions.societyCreationSau' },
      { slug: 'society-creation-sci', labelKey: 'requestOptions.societyCreationSci' },
      { slug: 'travel-agency-creation', labelKey: 'requestOptions.travelAgencyCreation' },
      { slug: 'wholesale-design', labelKey: 'requestOptions.wholesaleDesign' },
      { slug: 'domiciliation', labelKey: 'requestOptions.domiciliation' },
    ],
  },
  {
    key: 'courier',
    labelKey: 'requestCategories.courier',
    options: [
      { slug: 'courier-diploma-retrieval', labelKey: 'requestOptions.courierDiplomaRetrieval' },
      { slug: 'courier-translation-retrieval', labelKey: 'requestOptions.courierTranslationRetrieval' },
      { slug: 'certificate-of-market-authorization', labelKey: 'requestOptions.certificateOfMarketAuthorization' },
      { slug: 'other-administrative-certificate', labelKey: 'requestOptions.otherAdministrativeCertificate' },
      { slug: 'administrative-procedures-for-automobiles', labelKey: 'requestOptions.courierAutomobileProcedure' },
    ],
  },
  {
    key: 'legalDepartment',
    labelKey: 'requestCategories.legalDepartment',
    options: [
      { slug: 'employment-contract', labelKey: 'requestOptions.employmentContract' },
      { slug: 'lease-contract', labelKey: 'requestOptions.leaseContract' },
      { slug: 'service-provider-contract', labelKey: 'requestOptions.serviceProviderContract' },
      { slug: 'legal-consulting', labelKey: 'requestOptions.legalConsulting' },
      { slug: 'dismissal-assistance', labelKey: 'requestOptions.dismissalAssistance' },
      { slug: 'internal-regulations', labelKey: 'requestOptions.internalRegulations' },
      { slug: 'cnaps-ostie-affiliation', labelKey: 'requestOptions.cnapsOstieAffiliation' },
      { slug: 'irsa-declaration', labelKey: 'requestOptions.irsaDeclaration' },
    ],
  },
  {
    key: 'roomRental',
    labelKey: 'requestCategories.roomRental',
    options: [
      { slug: 'office-room-rental', labelKey: 'requestOptions.officeRoomRental' },
      { slug: 'meeting-room-rental', labelKey: 'requestOptions.meetingRoomRental' },
      { slug: 'training-room-rental', labelKey: 'requestOptions.trainingRoomRental' },
      { slug: 'hr-training', labelKey: 'requestOptions.hrTraining' },
    ],
  },
  {
    key: 'adviceAndAssistance',
    labelKey: 'requestCategories.adviceAndAssistance',
    options: [
      { slug: 'company-creation-consulting', labelKey: 'requestOptions.companyCreationConsulting' },
      { slug: 'company-modification-assistance', labelKey: 'requestOptions.companyModificationAssistance' },
      { slug: 'business-formalization-assistance', labelKey: 'requestOptions.businessFormalizationAssistance' },
      { slug: 'strategic-consulting-for-entrepreneurs', labelKey: 'requestOptions.strategicConsultingForEntrepreneurs' },
    ],
  },
  {
    key: 'otherDemand',
    labelKey: 'otherDemand',
    options: []
  }
];

/* --------------------------------------------------------------------------- */ 
/* Special categories: ?selected=<selectedKey> */ 
/* - Without subcategories (standalone). */ 
/* - Hidden in normal use. */ 
/* - When the URL contains a valid `selected`, these are the ONLY categories */ 
/* displayed, and the one corresponding to the URL is active. */ 
/* selectedKey in lowercase: the comparison ignores case. */ 
/* --------------------------------------------------------------------------- */
const SPECIAL_CATEGORIES: SpecialCategory[] = [
  { key: 'taxCard', selectedKey: 'taxcard', labelKey: 'requestOptions.taxCardRenewal', standalone: true, options: [{ slug: 'tax-card-renewal', labelKey: 'requestOptions.taxCardRenewal' }] },
  { key: 'activity', selectedKey: 'activity', labelKey: 'requestOptions.activityChange', standalone: true, options: [{ slug: 'activity-change', labelKey: 'requestOptions.activityChange' }] },
  { key: 'headOffice', selectedKey: 'headoffice', labelKey: 'requestOptions.headOfficechanded', standalone: true, options: [{ slug: 'head-office-change', labelKey: 'requestOptions.headOfficechanded' }] },
  { key: 'closure', selectedKey: 'closure', labelKey: 'requestOptions.businessClosure', standalone: true, options: [{ slug: 'business-closure', labelKey: 'requestOptions.businessClosure' }] },
  { key: 'letter', selectedKey: 'letter', labelKey: 'requestOptions.administrativeLetter', standalone: true, options: [{ slug: 'administrative-letter', labelKey: 'requestOptions.administrativeLetter' }] },
  { key: 'requests', selectedKey: 'requests', labelKey: 'requestOptions.variousRequests', standalone: true, options: [{ slug: 'various-requests', labelKey: 'requestOptions.variousRequests' }] },
];

/* -------------------------------------------------------------------------- */
/*  Origine : ?rate=citizen | stranger                                         */
/* -------------------------------------------------------------------------- */
const RATE_TO_ORIGIN: Record<string, SelectableOrigin> = {
  citizen: 'malgache',
  stranger: 'etranger',
};

const getOriginFromRate = (rate: string | null): SelectableOrigin | null =>
  rate ? RATE_TO_ORIGIN[rate.toLowerCase()] ?? null : null;

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */
const ALL_OPTIONS: Array<RequestOption & { categoryKey: string }> = [...REQUEST_CATALOG, ...SPECIAL_CATEGORIES].flatMap(
  (category) => category.options.map((option) => ({ ...option, categoryKey: category.key })),
);

const getSpecialCategory = (selected: string | null): SpecialCategory | null =>
  selected ? SPECIAL_CATEGORIES.find((category) => category.selectedKey === selected.toLowerCase()) ?? null : null;

/** Determines the option and category to select according to the query params. */
function resolveQuery(type: string | null, selected: string | null) {
  const special = getSpecialCategory(selected);
  if (special) {
    return { slug: special.options[0].slug, categoryKey: special.key };
  }

  const normalized = type?.toLowerCase() ?? null;
  if (normalized) {
    for (const category of REQUEST_CATALOG) {
      const match = category.options.find((option) => option.slug === normalized);
      if (match) return { slug: match.slug, categoryKey: category.key };
    }
  }

  const first = REQUEST_CATALOG[0];
  return { slug: first.options[0].slug, categoryKey: first.key };
}

const getInitialForm = (slug: string): FormState => ({
  nom: '',
  phone: '',
  whatsapp: '',
  email: '',
  demande: slug,
  message: '',
  domicilierAxcel: false,
});

type FieldErrors = Partial<Record<'nom' | 'phone' | 'demande', string>>;

export default function QuotePage() {
  const t = useTranslations('QuotePage');
  const searchParams = useSearchParams();
  const requestedType = searchParams.get('type');
  const requestedRate = searchParams.get('rate');
  const requestedSelected = searchParams.get('selected');

  // Translation keys are dynamic
  const label = (key: string) => t(key as never);

  const initialQuery = resolveQuery(requestedType, requestedSelected);

  // With a valid `selected`, only special categories are offered
  const specialActive = getSpecialCategory(requestedSelected) !== null;
  const visibleCategories: RequestCategory[] = specialActive
  ? SPECIAL_CATEGORIES.filter((category) => category.key === initialQuery.categoryKey)
  : REQUEST_CATALOG;

    // Hidden original cards: with a valid `selected`, or with a type without rate
    // Cartes d'origine masquées uniquement avec un `selected` valide
  const showOrigin = !specialActive;

  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialQuery.categoryKey);
  const originOptions: Array<{ value: SelectableOrigin; label: string; description: string }> = [
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
  const [origin, setOrigin] = useState<Origin>(
    () => getOriginFromRate(requestedRate) ?? ORIGIN_UNSPECIFIED,
  );
  const [form, setForm] = useState<FormState>(() => getInitialForm(initialQuery.slug));
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Resynchronize the selection when the query params change 
// (state adjustment during rendering, without useEffect)
  const queryKey = `${requestedType}|${requestedRate}|${requestedSelected}`;
  const [prevQueryKey, setPrevQueryKey] = useState(queryKey);

  if (prevQueryKey !== queryKey) {
    setPrevQueryKey(queryKey);

    const query = resolveQuery(requestedType, requestedSelected);
    setForm((prev) => ({ ...prev, demande: query.slug }));
    setSelectedCategory(query.categoryKey);
    setOrigin(getOriginFromRate(requestedRate) ?? ORIGIN_UNSPECIFIED);
  }

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
      if (!value || !ALL_OPTIONS.some((option) => option.slug === value)) {
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

  const handleSelectOption = (option: RequestOption) => {
    handleInputChange('demande', option.slug);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (showOrigin && origin === ORIGIN_UNSPECIFIED) {
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

    // Wording of the request translated into the current language of the site
    const selectedOption = ALL_OPTIONS.find((option) => option.slug === form.demande);

    const payload = {
      ...form,
      demande: selectedOption ? label(selectedOption.labelKey) : form.demande,
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
      const initial = resolveQuery(requestedType, requestedSelected);
      setForm(getInitialForm(initial.slug));
      setSelectedCategory(initial.categoryKey);
      setOrigin(getOriginFromRate(requestedRate) ?? ORIGIN_UNSPECIFIED);
      recaptchaRef.current?.reset();
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : t('errors.unknown');
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentCategory = visibleCategories.find((category) => category.key === selectedCategory);
  const titleKey = showOrigin ? 'title' : 'noCardsTitle';

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
                 {t(titleKey)}
              </h2>
              <p className="mt-3 text-sm text-slate-600 sm:text-base">
                {t('subtitle')}
              </p>
            </div>

            {showOrigin && (
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
            )}

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
                    {visibleCategories.map((category) => {
                      const isSelected = selectedCategory === category.key;

                      return (
                        <button
                          key={category.key}
                          type="button"
                          onClick={() => {
                            setSelectedCategory(category.key);
                            const first = category.options[0];
                            if (first) handleSelectOption(first);
                          }}
                          className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                            isSelected
                              ? 'border-secondary bg-secondary text-white shadow-sm'
                              : 'border-slate-200 bg-white text-primary hover:border-secondary/60 hover:text-secondary'
                          }`}
                        >
                          {label(category.labelKey)}
                        </button>
                      );
                    })}
                  </div>

                  {/* Standalone categories have no subcategories */}
                  {currentCategory && !currentCategory.standalone && (
                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      {currentCategory.options.map((option) => {
                        const isOptionSelected = form.demande === option.slug;

                        return (
                          <button
                            key={option.slug}
                            type="button"
                            onClick={() => handleSelectOption(option)}
                            className={`rounded-xl border px-3 py-2.5 text-left text-sm transition-all duration-200 ${
                              isOptionSelected
                                ? 'border-secondary bg-secondary/5 text-primary shadow-sm'
                                : 'border-slate-200 bg-white text-slate-700 hover:border-secondary/60 hover:text-secondary'
                            }`}
                          >
                            {label(option.labelKey)}
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
