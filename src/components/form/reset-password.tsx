'use client';

import { Button, Form } from '@/components/ui';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { AuthResetPassword } from '../validators';
import { PasswordInput } from './form-handle/password-input';
import { useUpdatePassword } from '@refinedev/core';
import { UpdatePasswordTypes } from '@/providers/auth-provider/auth-provider';

export default function ResetPassword() {
  const { mutate: resetPassword } = useUpdatePassword();

  const router = useRouter();
  const searchParams = useSearchParams();
  const hash = searchParams.get('hash');
  if (!hash) {
    router.push('/login');
  }

  const resetPwForm = useForm<AuthResetPassword>({
    resolver: classValidatorResolver(AuthResetPassword),
    defaultValues: new AuthResetPassword({ hash: hash || '', password: '', rePassword: '' }),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = resetPwForm;
  const onSubmit = async (data: AuthResetPassword) => {
    const payload: UpdatePasswordTypes = {
      type: 'reset',
      data: {
        password: data.password,
        rePassword: data.rePassword,
        hash: hash || '',
      },
    };
    resetPassword(payload as any);
  };

  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-lg dark:text-white mb-1">
        Tạo lại mật khẩu
      </h1>

      <hr />
      <Form {...resetPwForm}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <PasswordInput<AuthResetPassword> label="Mật khẩu" name="password" className="mb-4" />
          <PasswordInput label="Nhập lại mật khẩu" name="rePassword" className="mb-4" />

          <Button type="submit" className="w-full mt-4" isLoading={isSubmitting} variant="red">
            Xác nhận
          </Button>
        </form>
      </Form>
    </div>
  );
}
