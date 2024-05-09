import { ReactNode } from 'react';
import { Metadata } from 'next/types';

export const metadata: Metadata = {
  title: 'Quên mật khẩu - Trang quản trị Techcell',
  description: 'Quên mật khẩu - Trang quản trị Techcell',
};

export default function ForgotPasswordParallelLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <>{children}</>;
}
