'use client';

import { memo } from 'react';
import { Button, Form, useToast } from '@/components/ui';
import { useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { AuthForgotPw } from '@/components/validators';
import { TextInput } from '@/components/form/form-handle/text-input';
import { useActiveAuthProvider, useForgotPassword } from '@refinedev/core';

export type ForgotPasswordProps = {
  handleClose: () => void;
  cancelButton?: React.ReactNode;
};

export const ForgotPasswordForm = memo(({ handleClose, cancelButton }: ForgotPasswordProps) => {
  const authProvider = useActiveAuthProvider();
  const { mutate: forgotPassword } = useForgotPassword<AuthForgotPw>({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const currentUrl =
    typeof window !== 'undefined' ? window.location.origin + '/reset-password' : undefined;

  const forgotPwForm = useForm<AuthForgotPw>({
    resolver: classValidatorResolver(AuthForgotPw),
    defaultValues: new AuthForgotPw({
      email: process.env.NEXT_PUBLIC_EMAIL_MANAGER ?? '',
      returnUrl: currentUrl,
    }),
  });

  const {
    formState: { isSubmitting },
    handleSubmit,
  } = forgotPwForm;
  const onSubmit = ({ email }: AuthForgotPw) => {
    forgotPassword({ email, returnUrl: currentUrl });
  };

  return (
    <Form {...forgotPwForm}>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
        <TextInput<AuthForgotPw> name="email" label="Email" className="mb-4" />

        <div className="w-full flex justify-end gap-4 mt-7">
          {cancelButton ? (
            cancelButton
          ) : (
            <Button variant="ghost" type="button" onClick={handleClose}>
              Đóng
            </Button>
          )}
          <Button type="submit" variant="red" isLoading={isSubmitting}>
            Xác nhận
          </Button>
        </div>
      </form>
    </Form>
  );
});

ForgotPasswordForm.displayName = 'ForgotPassword';
