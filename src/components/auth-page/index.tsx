'use client';

import type { AuthPageProps as AuthPagePropsCore, HttpError } from '@refinedev/core';
import { AuthPage as AuthPageBase } from '@/pages/auth';

type AuthPageProps = AuthPagePropsCore & {
  authenticated?: boolean;
  redirectTo?: string;
  error?: HttpError | Error;
};

export const AuthPage = (props: AuthPageProps) => {
  return <AuthPageBase {...props} />;
};
