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
import { useTranslate } from '@refinedev/core';

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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const translate = useTranslate();

  const authProvider = useActiveAuthProvider();
  const { mutate: login } = useLogin<LoginFormTypes>({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const renderLink = (link: string, text?: string) => {
    return (
      <ActiveLink to={link} className="text-blue-500 hover:underline">
        {text}
      </ActiveLink>
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

  const content = (
    <div {...contentProps}>
      <h1 className="text-center">{translate('pages.login.title', 'Sign in to your account')}</h1>
      {renderProviders()}
      {!hideForm && (
        <>
          <hr />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              login({ email, password, remember });
            }}
            {...formProps}
          >
            <div className="flex flex-col p-6">
              <label htmlFor="email-input">{translate('pages.login.fields.email', 'Email')}</label>
              <input
                id="email-input"
                name="email"
                type="text"
                className="mb-4 p-2 border rounded"
                autoCorrect="off"
                spellCheck={false}
                autoCapitalize="off"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="password-input">
                {translate('pages.login.fields.password', 'Password')}
              </label>
              <input
                id="password-input"
                type="password"
                name="password"
                required
                className="mb-4 p-2 border rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
                    {translate('pages.login.buttons.rememberMe', 'Remember me')}
                  </label>
                </>
              )}
              {forgotPasswordLink ??
                renderLink(
                  '/forgot-password',
                  translate('pages.login.buttons.forgotPassword', 'Forgot password?'),
                )}
              <input
                type="submit"
                value={translate('pages.login.signin', 'Sign in')}
                className="mb-4 p-2 bg-blue-500 text-white rounded cursor-pointer"
              />
              {registerLink ?? (
                <span>
                  {translate('pages.login.buttons.noAccount', 'Don’t have an account?')}{' '}
                  {renderLink('/register', translate('pages.login.register', 'Sign up'))}
                </span>
              )}
            </div>
          </form>
        </>
      )}
      {registerLink !== false && hideForm && (
        <div className="text-center">
          {translate('pages.login.buttons.noAccount', 'Don’t have an account?')}{' '}
          {renderLink('/register', translate('pages.login.register', 'Sign up'))}
        </div>
      )}
    </div>
  );

  return <div {...wrapperProps}>{renderContent ? renderContent(content, title) : content}</div>;
};
