import { AuthPage } from '@components/auth-page';
import { authProviderServer } from '@providers/auth-provider';
import { redirect } from 'next/navigation';

export default async function Login() {
  const data = await getData();

  if (data.authenticated) {
    redirect(data?.redirectTo || '/');
  }
  console.log(data.error);

  return <AuthPage type="login" error={data?.error} />;
}

async function getData() {
  const { authenticated, redirectTo, error } = await authProviderServer.check();

  return {
    authenticated,
    redirectTo,
    error,
  };
}
