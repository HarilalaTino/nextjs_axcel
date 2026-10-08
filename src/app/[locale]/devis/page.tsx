'use client';

import { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import {
  AlertCircle,
  ArrowRight,
  Check,
  CheckCircle2,
  Mail,
  MessageSquareText,
  Phone,
  UserRound,
} from 'lucide-react';
import frenchMessages from '../../../../messages/fr.json';
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
  demandes: string[]; // slugs sélectionnés (multi-sélection)
  quantites: Record<string, number>;
  message: string;
  isRegister: boolean;
};

type TextField = 'nom' | 'phone' | 'whatsapp' | 'email' | 'message';

type RequestOption = {
  slug: string;
  labelKey: string;
  quantityAware?: boolean;
  unitPriceAr?: number;
  pricesByQuantity?: Record<number, number>;
};

type RequestCategory = {
  key: string;
  labelKey: string;
  options: RequestOption[];
  /** Catégorie sans sous-catégories : le clic sélectionne directement son unique option. */
  standalone?: boolean;
};

type SpecialCategory = RequestCategory & { selectedKey: string };

/* --------------------------------------------------------------------------- */
/* Catalogue des demandes (catégories -> sous-catégories)                      */
/* Chaque slug est unique : la sélection se fait toujours par slug.            */
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
      { slug: 'diplome-master', labelKey: 'requestOptions.diplomeMaster', quantityAware: true },
      { slug: 'licence', labelKey: 'requestOptions.licence', quantityAware: true },
      { slug: 'attestation-de-reussite', labelKey: 'requestOptions.achievementCertificate', quantityAware: true },
      { slug: 'certificate-of-market-authorization', labelKey: 'requestOptions.certificateOfMarketAuthorization', quantityAware: true },
      { slug: 'administrative-procedures-for-automobiles', labelKey: 'requestOptions.courierAutomobileProcedure', quantityAware: true },
      { slug: 'releve-de-notes-bacc', labelKey: 'requestOptions.baccTranscript', quantityAware: true },
      { slug: 'copie-acte-de-naissance', labelKey: 'requestOptions.birthCertificateCopy', quantityAware: true, unitPriceAr: 30000 },
      { slug: 'acte-de-mariage', labelKey: 'requestOptions.marriageCertificate', quantityAware: true },
      { slug: 'traduction-acte-de-naissance', labelKey: 'requestOptions.birthCertificateTranslation', quantityAware: true, unitPriceAr: 50000 },
      { slug: 'traduction-acte-de-mariage', labelKey: 'requestOptions.marriageCertificateTranslation', quantityAware: true },
      { slug: 'bulletin-n3', labelKey: 'requestOptions.bulletin3', quantityAware: true, pricesByQuantity: { 1: 38000, 2: 46000, 3: 54000 } },
      { slug: 'certification-cin', labelKey: 'requestOptions.cinCertification', quantityAware: true, unitPriceAr: 30000 },
      { slug: 'recuperation-certificat-nationalite', labelKey: 'requestOptions.nationalityCertificateRetrieval', quantityAware: true, unitPriceAr: 50000 },
      { slug: 'recuperation-rcs-moins-de-3-mois', labelKey: 'requestOptions.rcsRetrieval', quantityAware: true },
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
  { key: 'otherDemand',
    labelKey: 'otherDemand',
    standalone: true,
    options: [{ slug: 'other-demand', labelKey: 'otherDemand' }],
  },
];
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

const REGISTERED_OFFICE_SLUGS = [
  'sarl-creation',
  'sarlu-creation',
  'society-creation-sa',
  'society-creation-sau',
  'society-creation-sci',
  'sole-proprietorship-creation',
] as const;

const isRegisteredOfficeAvailable = (slug: string): boolean =>
  REGISTERED_OFFICE_SLUGS.includes(slug as (typeof REGISTERED_OFFICE_SLUGS)[number]);

const getSpecialCategory = (selected: string | null): SpecialCategory | null =>
  selected ? SPECIAL_CATEGORIES.find((category) => category.selectedKey === selected.toLowerCase()) ?? null : null;

/** 
* Determines the pre-selection from the query params. 
* - ?selected=<key> -> special category (only one option) 
* - ?type=slug1,slug2,... -> several pre-checked options (unknown slugs ignored) 
* - otherwise -> no option checked 
* The URL is only read on arrival: it is not updated with each click. 
*/
function resolveQuery(type: string | null, selected: string | null): { slugs: string[]; categoryKey: string | null } {
  const special = getSpecialCategory(selected);
  if (special) {
    return { slugs: [special.options[0].slug], categoryKey: special.key };
  }

  const requested = (type?.toLowerCase().split(',') ?? []).map((value) => value.trim()).filter(Boolean);
  const matches = ALL_OPTIONS.filter(
    (option) => requested.includes(option.slug) && REQUEST_CATALOG.some((category) => category.key === option.categoryKey),
  );
  const slugs = Array.from(new Set(matches.map((option) => option.slug)));

  if (slugs.length > 0) {
    return { slugs, categoryKey: matches[0].categoryKey };
  }

  return { slugs: [], categoryKey: REQUEST_CATALOG[0].key };
}

const getInitialForm = (slugs: string[]): FormState => ({
  nom: '',
  phone: '',
  whatsapp: '',
  email: '',
  demandes: slugs,
  quantites: Object.fromEntries(slugs.map((slug) => [slug, 1])),
  message: '',
  isRegister: false,
});

const getFrenchOptionLabel = (labelKey: string): string => {
  const quotePage = frenchMessages.QuotePage as unknown as Record<string, unknown>;
  const prefix = 'requestOptions.';

  if (labelKey.startsWith(prefix)) {
    const options = quotePage.requestOptions as Record<string, string>;
    return options[labelKey.slice(prefix.length)] ?? labelKey;
  }

  const value = quotePage[labelKey];
  return typeof value === 'string' ? value : labelKey;
};

const getOptionPrice = (option: RequestOption, quantity: number): string | null => {
  if (option.pricesByQuantity) {
    return option.pricesByQuantity[quantity] ? `${option.pricesByQuantity[quantity].toLocaleString('fr-FR')} Ar` : null;
  }

  if (option.unitPriceAr) {
    return `${(option.unitPriceAr * quantity).toLocaleString('fr-FR')} Ar`;
  }

  return null;
};

type FieldErrors = Partial<Record<'nom' | 'phone' | 'demande', string>>;

/* -------------------------------------------------------------------------- */
/*  Shared input classes (mobile < 425px first, then min-[425px]: and up)      */
/* -------------------------------------------------------------------------- */
const INPUT_BASE =
  'w-full min-w-0 rounded-xl border bg-white px-3 py-2.5 text-sm outline-none transition focus:ring-2 min-[425px]:px-4 min-[425px]:py-3';
const INPUT_OK = 'border-slate-200 focus:border-secondary focus:ring-secondary/20';
const INPUT_ERROR = 'border-red-300 focus:border-red-500 focus:ring-red-100';

export default function QuotePage() {
  const t = useTranslations('QuotePage');
  const searchParams = useSearchParams();
  const requestedType = searchParams.get('type');
  const requestedRate = searchParams.get('rate');
  const requestedSelected = searchParams.get('selected');

  // Translation keys are dynamic
  const label = (key: string) => t(key as never);

  const initialQuery = resolveQuery(requestedType, requestedSelected);

  const specialActive = getSpecialCategory(requestedSelected) !== null;
  const visibleCategories: RequestCategory[] = specialActive
    ? SPECIAL_CATEGORIES.filter((category) => category.key === initialQuery.categoryKey)
    : REQUEST_CATALOG;

  const showOrigin = !specialActive;

  const [openCategory, setOpenCategory] = useState<string | null>(initialQuery.categoryKey);
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
  const [form, setForm] = useState<FormState>(() => getInitialForm(initialQuery.slugs));
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const queryKey = `${requestedType}|${requestedRate}|${requestedSelected}`;
  const [prevQueryKey, setPrevQueryKey] = useState(queryKey);

  if (prevQueryKey !== queryKey) {
    setPrevQueryKey(queryKey);

    const query = resolveQuery(requestedType, requestedSelected);
    setForm((prev) => ({
      ...prev,
      demandes: query.slugs,
      isRegister: query.slugs.some(isRegisteredOfficeAvailable) ? prev.isRegister : false,
    }));
    setOpenCategory(query.categoryKey);
    setOrigin(getOriginFromRate(requestedRate) ?? ORIGIN_UNSPECIFIED);
  }

  const validateText = (field: 'nom' | 'phone', value: string): string | null => {
    const trimmed = value.trim();

    if (field === 'nom') {
      if (!trimmed) return t('errors.fullNameRequired');
      if (trimmed.length < 2) return t('errors.fullNameMinLength');
      return null;
    }

    if (!trimmed) return t('errors.phoneRequired');
    if (!/^(?:\+?[0-9\s().-]{8,20})$/.test(trimmed)) return t('errors.phoneInvalid');
    return null;
  };

  const validateDemandes = (slugs: string[]): string | null => {
    const hasValid = slugs.some((slug) => ALL_OPTIONS.some((option) => option.slug === slug));
    return hasValid ? null : t('errors.requestTypeRequired');
  };

  const validateForm = (): boolean => {
    const nextErrors: FieldErrors = {
      nom: validateText('nom', form.nom) ?? undefined,
      phone: validateText('phone', form.phone) ?? undefined,
      demande: validateDemandes(form.demandes) ?? undefined,
    };

    setFieldErrors(nextErrors);
    return !Object.values(nextErrors).some((message) => Boolean(message));
  };

  const handleInputChange = (field: TextField, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field === 'nom' || field === 'phone') {
      setFieldErrors((prev) => ({ ...prev, [field]: validateText(field, value) ?? undefined }));
    }
    setSubmitted(false);
    setError(null);
  };

  const handleToggleRegister = (value: boolean) => {
    setForm((prev) => ({ ...prev, isRegister: value }));
    setSubmitted(false);
    setError(null);
  };

  const handleToggleOption = (option: RequestOption) => {
    const exists = form.demandes.includes(option.slug);
    const demandes = exists
      ? form.demandes.filter((slug) => slug !== option.slug)
      : [...form.demandes, option.slug];

    setForm((prev) => ({
      ...prev,
      demandes,
      quantites: {
        ...prev.quantites,
        [option.slug]: exists ? prev.quantites[option.slug] ?? 1 : 1,
      },
      isRegister: demandes.some(isRegisteredOfficeAvailable) ? prev.isRegister : false,
    }));
    setFieldErrors((prev) => ({ ...prev, demande: validateDemandes(demandes) ?? undefined }));
    setSubmitted(false);
    setError(null);
  };

  const handleQuantityChange = (slug: string, value: number) => {
    const quantity = Math.max(1, Number.isFinite(value) ? Math.round(value) : 1);
    setForm((prev) => ({
      ...prev,
      quantites: { ...prev.quantites, [slug]: quantity },
    }));
  };

  const handleCategoryClick = (category: RequestCategory) => {
    if (category.standalone) {
      setOpenCategory(category.key);
      handleToggleOption(category.options[0]);
      return;
    }
    setOpenCategory((prev) => (prev === category.key ? null : category.key));
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

    const selectedLabels = ALL_OPTIONS
      .filter((option) => form.demandes.includes(option.slug))
      .map((option) => {
        const quantity = form.quantites[option.slug] ?? 1;
        const label = getFrenchOptionLabel(option.labelKey);
        const price = getOptionPrice(option, quantity);
        return price ? `${label} : ${price}` : `${label} (x${quantity})`;
      });

    const { demandes, quantites, ...rest } = form;
    const payload = {
      ...rest,
      demande: selectedLabels.join(', '),
      demandes: selectedLabels,
      origin,
      captchaToken,
    };
    void demandes;
    void quantites;

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
      setForm(getInitialForm(initial.slugs));
      setOpenCategory(initial.categoryKey);
      setOrigin(getOriginFromRate(requestedRate) ?? ORIGIN_UNSPECIFIED);
      recaptchaRef.current?.reset();
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : t('errors.unknown');
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentCategory = visibleCategories.find((category) => category.key === openCategory);
  const titleKey = showOrigin ? 'title' : 'noCardsTitle';
  const showRegisteredOffice = form.demandes.some(isRegisteredOfficeAvailable);

  return (
    <>
      <TopMenu />
      <NavMenu />

      {/* pb-24 on mobile: keeps the floating scroll-to-top button from hiding the submit button */}
      <main className="overflow-x-hidden bg-slate-50 px-2 pb-24 pt-6 min-[425px]:px-4 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_20px_60px_rgba(21,32,57,0.08)] min-[425px]:rounded-[2rem] min-[425px]:p-6 sm:p-8 lg:p-12">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary min-[425px]:text-sm">
                {t('eyebrow')}
              </h1>
              <h2 className="mt-3 text-2xl font-black text-primary min-[425px]:text-3xl sm:text-4xl">
                {t(titleKey)}
              </h2>
              <p className="mt-3 text-sm text-slate-600 sm:text-base">
                {t('subtitle')}
              </p>
            </div>

            {showOrigin && (
              <div
                role="radiogroup"
                className="mt-6 grid grid-cols-1 gap-3 min-[425px]:mt-10 min-[425px]:gap-4 md:grid-cols-2"
              >
                {originOptions.map((option) => {
                  const selected = origin === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => {
                        setOrigin(option.value);
                        setSubmitted(false);
                      }}
                      className={`min-w-0 rounded-2xl border p-4 text-left transition-all duration-200 min-[425px]:p-5 ${selected
                        ? 'border-secondary bg-secondary/5 shadow-md shadow-secondary/10'
                        : 'border-slate-200 bg-white hover:border-secondary/60 hover:bg-slate-50'
                        }`}
                    >
                      <div className="flex items-center justify-between gap-3 min-[425px]:gap-4">
                        <span className="min-w-0 text-base font-bold text-primary min-[425px]:text-lg">{option.label}</span>
                        <span
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${selected ? 'border-secondary bg-secondary' : 'border-slate-300 bg-white'
                            }`}
                        >
                          {selected && <span className="h-2 w-2 rounded-full bg-white" />}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-slate-600 min-[425px]:mt-3">{option.description}</p>
                    </button>
                  );
                })}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              noValidate
              className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-3 min-[425px]:mt-10 min-[425px]:rounded-3xl min-[425px]:p-5 sm:p-6"
            >
              <div className="grid grid-cols-1 gap-4 min-[425px]:gap-5 md:grid-cols-2">
                <label className="block min-w-0">
                  <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
                    <UserRound className="h-4 w-4 shrink-0 text-secondary" />
                    {t('form.fullName')}<span className="text-red-500">*</span>
                  </span>
                  <input
                    type="text"
                    value={form.nom}
                    onChange={(event) => handleInputChange('nom', event.target.value)}
                    aria-invalid={Boolean(fieldErrors.nom)}
                    className={`${INPUT_BASE} ${fieldErrors.nom ? INPUT_ERROR : INPUT_OK}`}
                  />
                  {fieldErrors.nom && <p className="mt-1 text-xs text-red-600">{fieldErrors.nom}</p>}
                </label>

                <label className="block min-w-0">
                  <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
                    <Phone className="h-4 w-4 shrink-0 text-secondary" />
                    {t('form.phone')}<span className="text-red-500">*</span>
                  </span>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(event) => handleInputChange('phone', event.target.value)}
                    aria-invalid={Boolean(fieldErrors.phone)}
                    className={`${INPUT_BASE} ${fieldErrors.phone ? INPUT_ERROR : INPUT_OK}`}
                  />
                  {fieldErrors.phone && <p className="mt-1 text-xs text-red-600">{fieldErrors.phone}</p>}
                </label>

                <label className="block min-w-0">
                  <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
                    <Phone className="h-4 w-4 shrink-0 text-secondary" />
                    WhatsApp
                  </span>
                  <input
                    type="tel"
                    value={form.whatsapp}
                    onChange={(event) => handleInputChange('whatsapp', event.target.value)}
                    className={`${INPUT_BASE} ${INPUT_OK}`}
                  />
                </label>

                <label className="block min-w-0">
                  <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
                    <Mail className="h-4 w-4 shrink-0 text-secondary" />
                    {t('form.email')}
                  </span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => handleInputChange('email', event.target.value)}
                    placeholder={t('form.emailPlaceholder')}
                    className={`${INPUT_BASE} ${INPUT_OK}`}
                  />
                </label>

                <fieldset className="block min-w-0 md:col-span-2">
                  <legend className="mb-3 block text-sm font-semibold text-primary">
                    {t('form.requestType')} <span className="text-red-500">*</span>
                  </legend>

                  {/* Catégories : ouvrent un panneau, ou basculent directement l'option si standalone */}
                  <div className="flex flex-wrap gap-2 min-[425px]:gap-2.5">
                    {visibleCategories.map((category) => {
                      const selectedCount = category.options.filter((option) =>
                        form.demandes.includes(option.slug),
                      ).length;
                      const isOpen = openCategory === category.key;
                      const isActive = category.standalone ? selectedCount > 0 : isOpen;

                      return (
                        <button
                          key={category.key}
                          type="button"
                          {...(category.standalone
                            ? { 'aria-pressed': isActive }
                            : { 'aria-expanded': isOpen })}
                          onClick={() => handleCategoryClick(category)}
                          className={`inline-flex max-w-full items-center gap-2 break-words rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200 min-[425px]:px-4 min-[425px]:py-2 min-[425px]:text-sm ${isActive
                            ? 'border-secondary bg-secondary text-white shadow-sm'
                            : 'border-slate-200 bg-white text-primary hover:border-secondary/60 hover:text-secondary'
                            }`}
                        >
                          {category.standalone && selectedCount > 0 && <Check className="h-3.5 w-3.5 shrink-0" />}
                          {label(category.labelKey)}
                          {!category.standalone && selectedCount > 0 && (
                            <span
                              className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-bold ${isActive ? 'bg-white text-secondary' : 'bg-secondary text-white'
                                }`}
                            >
                              {selectedCount}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {currentCategory && !currentCategory.standalone && (
                    <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {currentCategory.options.map((option) => {
                        const isOptionSelected = form.demandes.includes(option.slug);
                        const quantity = form.quantites[option.slug] ?? 1;

                        return (
                          <label key={option.slug} className="block min-w-0 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={isOptionSelected}
                              onChange={() => handleToggleOption(option)}
                              className="peer sr-only"
                            />
                            <span
                              className={`flex min-w-0 items-center justify-between gap-2 break-words rounded-xl border px-3 py-2 text-left text-xs transition-all duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-secondary/40 min-[425px]:py-2.5 min-[425px]:text-sm ${isOptionSelected
                                ? 'border-secondary bg-secondary/5 text-primary shadow-sm'
                                : 'border-slate-200 bg-white text-slate-700 hover:border-secondary/60 hover:text-secondary'
                                }`}
                            >
                              <span className="min-w-0">
                                <span className="block">{label(option.labelKey)}</span>
                                {option.quantityAware && (
                                  <span className="mt-1 block text-[11px] text-slate-500">
                                    {t('form.quantity')}: {quantity}
                                  </span>
                                )}
                              </span>
                              <span className="flex shrink-0 items-center gap-2">
                                {option.quantityAware && (
                                  <input
                                    type="number"
                                    min={1}
                                    max={option.pricesByQuantity ? 3 : 100}
                                    value={quantity}
                                    onChange={(event) => handleQuantityChange(option.slug, Number(event.target.value))}
                                    onClick={(event) => event.preventDefault()}
                                    aria-label={`${label(option.labelKey)} ${t('form.quantity')}`}
                                    className="w-16 rounded-lg border border-slate-200 bg-white px-2 py-1 text-center text-xs text-primary outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                                  />
                                )}
                                <span
                                  aria-hidden="true"
                                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${isOptionSelected
                                    ? 'border-secondary bg-secondary text-white'
                                    : 'border-slate-300 bg-white text-transparent'
                                    }`}
                                >
                                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                                </span>
                              </span>
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  )}

                  {/* Récapitulatif des demandes cochées (toutes catégories confondues) */}
                  {form.demandes.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-2" aria-label={t('form.requestType')}>
                      {ALL_OPTIONS.filter((option) => form.demandes.includes(option.slug)).map((option) => {
                        const quantity = form.quantites[option.slug] ?? 1;
                        const price = getOptionPrice(option, quantity);

                        return (
                          <li
                            key={option.slug}
                            className="inline-flex items-center gap-1.5 rounded-full border border-secondary/30 bg-secondary/5 px-3 py-1 text-xs text-primary"
                          >
                            <Check className="h-3 w-3 text-secondary" />
                            {label(option.labelKey)}
                            {price && <span className="font-semibold">{price}</span>}
                            <span className="text-slate-500">×{quantity}</span>
                          </li>
                        );
                      })}
                    </ul>
                  )}

                  {fieldErrors.demande && <p className="mt-2 text-xs text-red-600">{fieldErrors.demande}</p>}
                </fieldset>

                {showRegisteredOffice && (
                  <div className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-3 py-3 min-[425px]:gap-4 min-[425px]:px-4 md:col-span-2">
                    <span className="min-w-0 text-sm font-semibold text-primary">
                      {t('form.RegisteredOffice')}
                    </span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={form.isRegister}
                      onClick={() => handleToggleRegister(!form.isRegister)}
                      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 ${form.isRegister ? 'bg-secondary' : 'bg-slate-300'
                        }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${form.isRegister ? 'translate-x-6' : 'translate-x-1'
                          }`}
                      />
                    </button>
                  </div>
                )}

                <label className="block min-w-0 md:col-span-2">
                  <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
                    <MessageSquareText className="h-4 w-4 shrink-0 text-secondary" />
                    {t('form.message')}
                  </span>
                  <textarea
                    value={form.message}
                    onChange={(event) => handleInputChange('message', event.target.value)}
                    rows={6}
                    maxLength={1200}
                    placeholder={t('form.messagePlaceholder')}
                    className={`${INPUT_BASE} ${INPUT_OK} min-[425px]:min-h-[12rem]`}
                  />
                </label>

                {/* reCAPTCHA: fixed 304px width -> scaled down on very small screens */}
                <div className="min-w-0 md:col-span-2">
                  <div className="max-w-full overflow-hidden">
                    <div className="origin-top-left scale-[0.84] min-[375px]:scale-100">
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                        onChange={() => setCaptchaError(null)}
                      />
                    </div>
                  </div>
                  {captchaError && <p className="mt-2 text-xs text-red-600">{captchaError}</p>}
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-white transition hover:bg-secondary/90 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                >
                  {isSubmitting ? t('form.submitting') : t('form.submit')}
                  {!isSubmitting && <ArrowRight className="h-4 w-4" />}
                </button>
              </div>
            </form>

            {error && (
              <div
                role="alert"
                className="mt-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-3 text-red-700 min-[425px]:p-4"
              >
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                <div className="min-w-0">
                  <p className="font-semibold">{t('errors.title')}</p>
                  <p className="break-words text-sm">{error}</p>
                </div>
              </div>
            )}

            {submitted && (
              <div
                role="status"
                className="mt-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-emerald-800 min-[425px]:p-4"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                <div className="min-w-0">
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
