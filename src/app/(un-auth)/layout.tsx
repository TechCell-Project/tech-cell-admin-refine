import { authProviderServer } from '@/providers/auth-provider';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import React from 'react';

export const metadata: Metadata = {
  title: 'Trang quản trị Techcell',
  description: 'Trang quản trị Techcell',
};

export default async function UnAuthLayout({ children }: React.PropsWithChildren) {
  const data = await getData();

  if (data.authenticated) {
    return redirect(data?.redirectTo || '/users/staffs');
  }

  return <>{children}</>;
}

async function getData() {
  const { authenticated, redirectTo } = await authProviderServer.check();

  return {
    authenticated,
    redirectTo,
  };
}
