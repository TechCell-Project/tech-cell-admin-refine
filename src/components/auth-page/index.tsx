'use client';

import type { AuthPageProps as AuthPagePropsCore, HttpError } from '@refinedev/core';
import { AuthPage as AuthPageBase } from '@pages/auth';

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
        <div>
          <p className="p-2 text-blue-700 bg-blue-200 border border-blue-300 text-center">
            email: demo@refine.dev
            <br /> password: demodemo
          </p>
          {content}
        </div>
      )}
    />
  );
};
