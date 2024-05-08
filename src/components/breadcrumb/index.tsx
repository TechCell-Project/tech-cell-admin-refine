'use client';

import { useBreadcrumb } from '@refinedev/core';
import Link from 'next/link';

export const Breadcrumb = () => {
  const { breadcrumbs } = useBreadcrumb();

  return (
    <ul className="breadcrumb flex space-x-2 text-sm text-gray-500">
      {breadcrumbs.map((breadcrumb, index) => {
        return (
          <li key={`breadcrumb-${breadcrumb.label}`} className="flex items-center">
            {breadcrumb.href ? (
              <Link
                href={breadcrumb.href}
                className="text-blue-500 hover:text-blue-700 transition duration-200"
              >
                {breadcrumb.label}
              </Link>
            ) : (
              <span>{breadcrumb.label}</span>
            )}
            {index < breadcrumbs.length - 1 && <span>/</span>}
          </li>
        );
      })}
    </ul>
  );
};
