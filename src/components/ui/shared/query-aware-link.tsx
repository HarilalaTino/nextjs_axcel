'use client';

import { Link } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import type { MouseEvent, ReactNode } from 'react';

type QueryAwareLinkProps = {
  pathname: '/devis';
  query: Record<string, string>;
  preserveQueryParams?: boolean;
  requiredSelectionType?: string;
  className: string;
  children: ReactNode;
};

export default function QueryAwareLink({
  pathname,
  query,
  preserveQueryParams = false,
  requiredSelectionType,
  className,
  children,
}: QueryAwareLinkProps) {
  const searchParams = useSearchParams();
  const currentQuery = Object.fromEntries(searchParams.entries());
  const hrefQuery = preserveQueryParams
    ? { ...query, ...currentQuery }
    : query;
  const hasRequiredSelection = !requiredSelectionType
    || Boolean(currentQuery.type && currentQuery.type !== requiredSelectionType);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!hasRequiredSelection) event.preventDefault();
  };

  return (
    <Link
      href={{ pathname, query: hrefQuery }}
      className={className}
      aria-disabled={!hasRequiredSelection}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
