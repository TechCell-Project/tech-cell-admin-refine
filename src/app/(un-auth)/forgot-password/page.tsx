'use client';

import { memo } from 'react';
import { ForgotPasswordForm } from '@/components/form/forgot-password';
import Image from 'next/image';
import { useTranslate } from '@refinedev/core';
import { Button } from '@/components/ui';
import { useRouter } from 'next/navigation';

function ForgotPassword() {
  const translate = useTranslate();
  const router = useRouter();

  return (
    <div className="max-w-md mx-auto w-full bg-white rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-[#09090b]">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <Image width={100} height={50} src="/images/logo-red.png" alt="techcell-logo" priority />
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-1">
          {translate('pages.login.title', 'Quên Mật Khẩu')}
        </h1>
        <span className="text-[14px]">
          {translate('pages.login.subTitle', 'Tiếp tục để đến khôi phục mật khẩu')}
        </span>
        <div className="flex flex-col p-2">
          <ForgotPasswordForm
            handleClose={() => {}}
            cancelButton={
              <>
                <Button variant="ghost" type="button" onClick={() => router.push('/login')}>
                  Đăng nhập
                </Button>
              </>
            }
          />
        </div>
      </div>
    </div>
  );
}

export default memo(ForgotPassword);
