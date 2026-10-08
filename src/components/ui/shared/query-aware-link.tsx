'use client';

import { Link } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import type { ReactNode } from 'react';

type QueryAwareLinkProps = {
  pathname: '/devis';
  query: Record<string, string>;
  preserveQueryParams?: boolean;
  className: string;
  children: ReactNode;
};

export default function QueryAwareLink({
  pathname,
  query,
  preserveQueryParams = false,
  className,
  children,
}: QueryAwareLinkProps) {
  const searchParams = useSearchParams();
  const currentQuery = Object.fromEntries(searchParams.entries());
  const hrefQuery = preserveQueryParams
    ? { ...query, ...currentQuery }
    : query;

  return (
    <Link href={{ pathname, query: hrefQuery }} className={className}>
      {children}
    </Link>
  );
}
