import { Layout as BaseLayout } from '@/components/layout';
import { authProviderServer } from '@/providers/auth-provider';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import React from 'react';

export const metadata: Metadata = {
  title: 'Người Dùng - Trang quản trị Techcell',
  description: 'Người Dùng - Trang quản trị Techcell',
};

export default async function AuthLayout({ children }: React.PropsWithChildren) {
  const data = await getData();

  if (!data.authenticated) {
    return redirect(data?.redirectTo || '/login');
  }

  return <BaseLayout>{children}</BaseLayout>;
}

async function getData() {
  const { authenticated, redirectTo } = await authProviderServer.check();

  return {
    authenticated,
    redirectTo,
  };
}
