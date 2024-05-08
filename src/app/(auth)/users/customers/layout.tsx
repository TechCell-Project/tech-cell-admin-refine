import { Metadata } from 'next';
import { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'Khách Hàng - Trang quản trị Techcell',
  description: 'Khách Hàng - Trang quản trị Techcell',
};

export default function CustomerLayout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
