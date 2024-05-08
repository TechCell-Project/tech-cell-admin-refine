'use client';

import type { AuthPageProps as AuthPagePropsCore, HttpError } from '@refinedev/core';
import { AuthPage as AuthPageBase } from '@/pages/auth';
import { ThemeToggle } from '@/components/utils/theme-toggle';

type AuthPageProps = AuthPagePropsCore & {
  authenticated?: boolean;
  redirectTo?: string;
  error?: HttpError | Error;
};

export const AuthPage = (props: AuthPageProps) => {
  return (
    <AuthPageBase
      {...props}
      renderContent={(content) => (
        <>
          <div className="absolute top-5 right-5">
            <ThemeToggle />
          </div>
          {content}
        </>
      )}
    />
  );
};
