import { AuthPage } from '@/components/auth-page';
import { ThemeToggle } from '@/components/utils/theme-toggle';
import { authProviderServer } from '@/providers/auth-provider';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export default async function Login() {
  const data = await getData();

  if (data.authenticated) {
    redirect(data?.redirectTo || '/');
  }

  return (
    <>
      <Suspense>
        <section className="bg-gray-50 dark:bg-[#09090b] w-full relative">
          <div className="absolute top-5 right-5">
            <ThemeToggle />
          </div>
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-7">
            <div
              className="w-full bg-white rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-[#09090b]"
              style={{
                boxShadow:
                  'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
                borderRadius: '10px',
              }}
            >
              <AuthPage type="login" error={data?.error} registerLink={false} />
            </div>
          </div>
        </section>
      </Suspense>
    </>
  );
}

async function getData() {
  const { authenticated, redirectTo, error } = await authProviderServer.check();

  return {
    authenticated,
    redirectTo,
    error,
  };
}
