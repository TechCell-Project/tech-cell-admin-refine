'use client';

import type { AuthPageProps as AuthPagePropsCore, HttpError } from '@refinedev/core';
import { AuthPage as AuthPageBase } from '@refinedev/core';

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
          <p
            style={{
              padding: 10,
              color: '#004085',
              backgroundColor: '#cce5ff',
              borderColor: '#b8daff',
              textAlign: 'center',
            }}
          >
            email: demo@refine.dev
            <br /> password: demodemo
          </p>
          {content}
        </div>
      )}
    />
  );
};
