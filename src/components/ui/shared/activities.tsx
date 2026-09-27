"use client";

import {
    Building2,
    BriefcaseBusiness,
    FileText,
    Handshake,
    Landmark,
    MessageCircle,
    type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { NAV_ITEMS } from "@/components/layout/header";
import { AppPathname, Link } from "@/i18n/navigation";

const BRAND = "#152039";
type AppRoute = Extract<AppPathname, string>;
interface TagLink {
    label: string;
    href: AppRoute;
}

interface Category {
    title: string;
    icon: LucideIcon;
    href: AppRoute;
    tags: TagLink[];
}

const iconByLabel: Record<string, LucideIcon> = {
    creation: Building2,
    courier: BriefcaseBusiness,
    legalDdepartment: FileText,
    roomRental: Landmark,
    adviceAndAssistance: Handshake,
};

export default function Activities() {
    const homeT = useTranslations('Home');
    const navT = useTranslations('Nav');

    const categories: Category[] = NAV_ITEMS.filter(
        (item) => item.href !== '/a-propos' && item.href !== '/contact'
    ).map((item) => ({
        title: navT(item.label),
        icon: iconByLabel[item.label] ?? Building2,
        href: item.href,
        tags: (item.submenu?.map((subItem) => ({
            label: navT(subItem.label),
            href: subItem.href,
        })) ?? [{ label: navT(item.label), href: item.href }]),
    }));

    return (
        <div className="bg-slate-50 py-16 md:py-20">
            <div className="w-full  max-w-7xl mx-auto ">
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <span className="text-sm font-semibold uppercase tracking-wide text-secondary">
                        {homeT('servicesLabel')}
                    </span>
                    <h2 className="mt-3 text-3xl font-extrabold text-primary sm:text-4xl">
                        {homeT('servicesTitle')}
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-slate-500">
                        {homeT('servicesDescription')}
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr items-stretch">
                    {categories.map((category) => {
                        const Icon = category.icon;
                        return (
                            <div
                                key={category.title}
                                className="flex h-full min-h-[260px] flex-col rounded-2xl p-6"
                                style={{ backgroundColor: `${BRAND}0D` }}
                            >
                                <div
                                    className="mb-5 flex items-center gap-2 transition-opacity hover:opacity-90"
                                >
                                    <Icon className="h-5 w-5" style={{ color: BRAND }} strokeWidth={2} />
                                    <h3
                                        className="text-sm font-semibold tracking-wide"
                                        style={{ color: BRAND }}
                                    >
                                        {category.title}
                                    </h3>
                                </div>

                                <div className="flex flex-1 flex-wrap content-start gap-2">
                                    {category.tags.map((tag) => (
                                        <Link
                                            key={tag.href}
                                            href={tag.href}
                                            className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm transition-colors hover:bg-gray-50"
                                        >
                                            {tag.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        );
                    })}

                    <div
                        className="flex h-full min-h-[260px] flex-col rounded-2xl p-6"
                        style={{ backgroundColor: `${BRAND}0D` }}
                    >
                        <Link
                            href="/contact"
                            className="mb-5 flex items-center gap-2 transition-opacity hover:opacity-90"
                        >
                            <MessageCircle className="h-5 w-5" style={{ color: BRAND }} strokeWidth={2} />
                            <h3
                                className="text-sm font-semibold tracking-wide"
                                style={{ color: BRAND }}
                            >
                                {navT('contact')}
                            </h3>
                        </Link>

                        <div className="flex flex-1 items-center">
                            <p className="text-sm leading-relaxed text-slate-600">
                                {homeT('contactCardText')} <Link href={"/contact"} className="text-secondary underline">{navT('contact')}</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
