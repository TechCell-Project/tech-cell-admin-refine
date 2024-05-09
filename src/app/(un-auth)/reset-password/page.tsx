import LoadingPage from '@/app/loading';
import ResetPassword from '@/components/form/reset-password';
import { ThemeToggle } from '@/components/utils/theme-toggle';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Tạo lại mật khẩu - Techcell Dashboard',
  description: 'Tạo lại mật khẩu - Techcell Dashboard',
};

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <section className="bg-gray-50 dark:bg-gray-900 w-full relative">
        <div className="absolute top-5 right-5">
          <ThemeToggle />
        </div>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-7">
          <div
            className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
            style={{
              boxShadow:
                'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
              borderRadius: '10px',
            }}
          >
            <ResetPassword />
          </div>
        </div>
      </section>
    </Suspense>
  );
}
