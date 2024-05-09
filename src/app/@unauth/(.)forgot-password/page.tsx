'use client';

import { memo } from 'react';
import { DialogDisplay } from '@/components/display';
import { ForgotPasswordForm } from '@/components/form/forgot-password';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks';

function ForgotPasswordParallel() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    router.push('/users/staffs');
    return <></>;
  }

  const handleClose = () => {
    router.back();
  };

  return (
    <DialogDisplay trigger={<></>} title="Quên mật khẩu" open={true} setOpen={handleClose}>
      <ForgotPasswordForm handleClose={handleClose} />
    </DialogDisplay>
  );
}

export default memo(ForgotPasswordParallel);
