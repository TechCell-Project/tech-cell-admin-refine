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
import { ThemeProvider } from '@/providers/theme-provider';
import { quickSandFont } from '@/config/font';

export const metadata: Metadata = {
  title: 'Trang quản trị Techcell',
  description: 'Trang quản trị Techcell',
  icons: {
    icon: {
      url: '/images/favicon.ico',
      type: 'image/png',
    },
    shortcut: { url: '/images/favicon.ico', type: 'image/png' },
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ colorScheme: 'light' }} className={`${quickSandFont.className} light`}>
      <body className="min-h-screen flex justify-center items-center">
        <Suspense>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
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
                  <main className="w-full">
                    {children}
                    {modal}
                  </main>
                  <Toaster />
                  <RefineKbar />
                </Refine>
              </DevtoolsProvider>
            </RefineKbarProvider>
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  );
}
