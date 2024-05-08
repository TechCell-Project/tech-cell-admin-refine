import { Metadata } from 'next';
import { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'Nhân Viên - Trang quản trị Techcell',
  description: 'Nhân Viên - Trang quản trị Techcell',
};

export default function StaffLayout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
