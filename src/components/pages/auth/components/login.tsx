'use client';

import React, { useState } from 'react';
import {
  useActiveAuthProvider,
  useLink,
  useLogin,
  useRouterContext,
  useRouterType,
  LoginFormTypes,
  LoginPageProps,
} from '@refinedev/core';
import Image from 'next/image';
import { useTranslate } from '@refinedev/core';
import { useForm } from 'react-hook-form';
import { TextInput } from '@/components/form/form-handle/text-input';
import { PasswordInput } from '@/components/form/form-handle/password-input';
import { AuthLogin } from '@/components/validators';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

type DivPropsType = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
type FormPropsType = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;

type LoginProps = LoginPageProps<DivPropsType, DivPropsType, FormPropsType>;

export const LoginPage: React.FC<LoginProps> = ({
  providers,
  registerLink,
  forgotPasswordLink,
  rememberMe,
  contentProps,
  wrapperProps,
  renderContent,
  formProps,
  title = undefined,
  hideForm,
}) => {
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === 'legacy' ? LegacyLink : Link;

  const [remember, setRemember] = useState(false);

  const translate = useTranslate();

  const authProvider = useActiveAuthProvider();
  const { mutate: login } = useLogin<LoginFormTypes>({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const renderLink = (link: string, text?: string) => {
    return (
      <span className="w-full flex justify-center mt-4">
        <ActiveLink to={link} className="inline-flex text-sm cursor-pointer hover:underline">
          {text}
        </ActiveLink>
      </span>
    );
  };

  const renderProviders = () => {
    if (providers) {
      return providers.map((provider) => (
        <div key={provider.name} className="flex items-center justify-center mb-4">
          <button
            onClick={() =>
              login({
                providerName: provider.name,
              })
            }
            className="flex items-center"
          >
            {provider?.icon}
            {provider.label ?? <label>{provider.label}</label>}
          </button>
        </div>
      ));
    }
    return null;
  };

  const loginForm = useForm<AuthLogin>({
    resolver: classValidatorResolver(AuthLogin),
    defaultValues: new AuthLogin({
      email: process.env.NEXT_PUBLIC_EMAIL_MANAGER ?? '',
      password: process.env.NEXT_PUBLIC_PASSWORD_MANAGER ?? '',
    }),
  });
  const {
    formState: { isSubmitting },
    handleSubmit,
  } = loginForm;

  const onSubmit = ({ email, password, remember }: LoginFormTypes) => {
    login({ email, password, remember });
  };

  const content = (
    <div {...contentProps} className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <Image width={100} height={50} src="/images/logo-red.png" alt="techcell-logo" priority />
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-1">
        {translate('pages.login.title', 'Đăng nhập')}
      </h1>
      <span className="text-[14px]">
        {translate('pages.login.subTitle', 'Tiếp tục để đến với trang quản trị Techcell')}
      </span>

      {renderProviders()}
      {!hideForm && (
        <>
          <hr />
          <Form {...loginForm}>
            <form onSubmit={handleSubmit(onSubmit)} {...formProps}>
              <div className="flex flex-col p-2">
                <TextInput<AuthLogin> name="email" label="Email" className="mb-5" />
                <PasswordInput<AuthLogin> name="password" label="Mật khẩu" className="mb-4" />
                {rememberMe ?? (
                  <>
                    <label htmlFor="remember-me-input" className="flex items-center mb-4">
                      <input
                        id="remember-me-input"
                        name="remember"
                        type="checkbox"
                        className="mr-2"
                        checked={remember}
                        value={remember.toString()}
                        onChange={() => {
                          setRemember(!remember);
                        }}
                      />
                      {translate('pages.login.buttons.rememberMe', 'Ghi nhớ')}
                    </label>
                  </>
                )}

                <Button
                  type="submit"
                  className="w-full mt-4"
                  isLoading={isSubmitting}
                  variant="red"
                >
                  Đăng nhập
                </Button>

                {forgotPasswordLink ??
                  renderLink(
                    '/forgot-password',
                    translate('pages.login.buttons.forgotPassword', 'Quên mật khẩu?'),
                  )}
                {registerLink ?? (
                  <span>
                    {translate('pages.login.buttons.noAccount', 'Don’t have an account?')}{' '}
                    {renderLink('/register', translate('pages.login.register', 'Sign up'))}
                  </span>
                )}
              </div>
            </form>
          </Form>
        </>
      )}
      {registerLink !== false && hideForm && (
        <div className="text-center">
          {translate('pages.login.buttons.noAccount', 'Don’t have an account?')}{' '}
          {renderLink('/register', translate('pages.login.register', 'Sign up'))}
        </div>
      )}
      <p className="text-center text-sm font-medium">
        Trang chủ:{' '}
        <Link to="https://techcell.cloud/" className="font-semibold underline">
          https://techcell.cloud/
        </Link>
      </p>
    </div>
  );

  return <div {...wrapperProps}>{renderContent ? renderContent(content, title) : content}</div>;
};
