import { DevtoolsProvider } from '@/providers/devtools';
import { Refine } from '@refinedev/core';
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar';
import routerProvider from '@refinedev/nextjs-router';
import { Metadata } from 'next';
import React, { Suspense } from 'react';

import { authProvider } from '@/providers/auth-provider';
import { dataProvider } from '@/providers/data-provider';
import '@/styles/global.css';

import { Toaster } from '@/components/ui/toaster';
import Favicon from '@/public/images/favicon.ico';

export const metadata: Metadata = {
  title: 'Trang quản trị Techcell',
  description: 'Trang quản trị Techcell',
  icons: {
    icon: {
      url: Favicon.src,
      type: 'image/png',
    },
    shortcut: { url: Favicon.src, type: 'image/png' },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Suspense>
          <RefineKbarProvider>
            <DevtoolsProvider>
              <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider}
                authProvider={authProvider}
                resources={[
                  {
                    name: 'staffs',
                    list: '/users/staffs',
                    create: '/users/staffs/create',
                    edit: '/users/staffs/edit/:id',
                    show: '/users/staffs/show/:id',
                    meta: {
                      canDelete: false,
                    },
                  },
                  {
                    name: 'customers',
                    list: '/users/customers',
                    create: '/users/customers/create',
                    edit: '/users/customers/edit/:id',
                    show: '/users/customers/show/:id',
                    meta: {
                      canDelete: false,
                    },
                  },
                  {
                    name: 'categories',
                    list: '/categories',
                    create: '/categories/create',
                    edit: '/categories/edit/:id',
                    show: '/categories/show/:id',
                    meta: {
                      canDelete: true,
                    },
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: 'nOqabo-012lBO-NnRYWu',
                }}
              >
                {children}
                <Toaster />
                <RefineKbar />
              </Refine>
            </DevtoolsProvider>
          </RefineKbarProvider>
        </Suspense>
      </body>
    </html>
  );
}
