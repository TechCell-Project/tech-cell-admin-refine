import React, { useEffect, useState } from 'react';
import { useNavigation, useTranslate, useResource, useGo, useRouterType } from '@refinedev/core';

export const ErrorComponent: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const translate = useTranslate();
  const { push } = useNavigation();
  const go = useGo();
  const routerType = useRouterType();

  const { resource, action } = useResource();

  useEffect(() => {
    if (resource && action) {
      setErrorMessage(
        translate(
          'pages.error.info',
          {
            action: action,
            resource: resource.name,
          },
          `You may have forgotten to add the "${action}" component to "${resource.name}" resource.`,
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resource, action]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {translate('pages.error.404', undefined, 'Sorry, the page you visited does not exist.')}
          </h2>
          {errorMessage && <p className="mt-2 text-center text-sm text-gray-600">{errorMessage}</p>}
        </div>
        <div>
          <button
            onClick={() => {
              if (routerType === 'legacy') {
                push('/');
              } else {
                go({ to: '/' });
              }
            }}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {translate('pages.error.backHome', undefined, 'Back Home')}
          </button>
        </div>
      </div>
    </div>
  );
};
