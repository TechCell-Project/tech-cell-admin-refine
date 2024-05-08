'use client';

import { PropsWithChildren } from 'react';
import { Breadcrumb } from '../breadcrumb';
import { Menu } from '../menu';

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="layout flex">
      <div className="w-64 bg-gray-800 text-white">
        <Menu />
      </div>
      <div className="content flex-grow bg-white text-black p-6">
        <Breadcrumb />
        <div>{children}</div>
      </div>
    </div>
  );
};
