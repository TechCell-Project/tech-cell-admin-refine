'use client';

import { memo } from 'react';
import { DialogDisplay } from '@/components/display';
import { ForgotPasswordForm } from '@/components/form/forgot-password';
import { useRouter } from 'next/navigation';

function ForgotPasswordParallel() {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <DialogDisplay
      trigger={'Quên mật khẩu'}
      title="Quên mật khẩu"
      open={true}
      setOpen={handleClose}
    >
      <ForgotPasswordForm handleClose={handleClose} />
    </DialogDisplay>
  );
}

export default memo(ForgotPasswordParallel);
