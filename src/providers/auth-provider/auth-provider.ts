'use client';

import { AuthProvider } from '@refinedev/core';
import {
  AuthApi,
  AuthEmailLoginDto,
  LoginResponseDto,
  RefreshTokenResponseDto,
} from '@techcell/node-sdk';
import Cookies from 'js-cookie';
import { toast } from '@/components/ui/use-toast';
import { AuthActionResponse } from '@refinedev/core/dist/contexts/auth/types';
import { AuthForgotPw } from '@/components/validators';

const authApi = new AuthApi();

export const authProvider: AuthProvider & {
  refresh: () => Promise<AuthActionResponse & { tokenData?: RefreshTokenResponseDto }>;
  getAuthData: () => LoginResponseDto | null;
} = {
  login: async ({ email, password, remember }: AuthEmailLoginDto & { remember: boolean }) => {
    try {
      const user = await authApi.authControllerLogin({
        authEmailLoginDto: {
          email,
          password,
        },
      });

      if (!user.data) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Invalid email or password',
        });
        throw new Error('Invalid email or password');
      }

      Cookies.set('auth', JSON.stringify(user.data), {
        expires: 30, // 30 days
        path: '/',
      });

      return {
        success: true,
        redirectTo: '/',
      };
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Invalid email or password',
      });
      return {
        success: false,
        error: {
          name: 'LoginError',
          message: 'Invalid email or password',
        },
      };
    }
  },
  logout: async () => {
    Cookies.remove('auth', { path: '/' });
    return {
      success: true,
      redirectTo: '/login',
    };
  },
  refresh: async () => {
    const auth = Cookies.get('auth');
    if (!auth) {
      return {
        success: false,
        error: {
          name: 'RefreshError',
          message: 'No auth token found',
        },
      };
    }

    try {
      const user = await authApi.authControllerRefresh({
        refreshTokenDto: {
          refreshToken: JSON.parse(auth).refreshToken,
        },
      });

      if (!user.data) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Refresh failed',
        });
        throw new Error('Refresh failed');
      }

      Cookies.set('auth', JSON.stringify({ ...JSON.parse(auth), ...user.data }), {
        expires: 30, // 30 days
        path: '/',
      });

      return {
        success: true,
        tokenData: user.data,
      };
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Refresh failed',
      });
      return {
        success: false,
        error: {
          name: 'LoginError',
          message: 'Refresh failed',
        },
      };
    }
  },
  getAuthData: (): LoginResponseDto | null => {
    const auth = Cookies.get('auth');
    if (auth) {
      const parsedUser: LoginResponseDto = JSON.parse(auth);
      return parsedUser;
    }
    return null;
  },
  check: async () => {
    const auth = Cookies.get('auth');
    if (auth) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      logout: true,
      redirectTo: '/login',
    };
  },
  getPermissions: async () => {
    const auth = Cookies.get('auth');
    if (auth) {
      const parsedUser = JSON.parse(auth);
      return parsedUser.roles;
    }
    return null;
  },
  getIdentity: async () => {
    const auth = Cookies.get('auth');
    if (auth) {
      const parsedUser = JSON.parse(auth);
      return parsedUser;
    }
    return null;
  },
  onError: async (error) => {
    if (error.response?.status === 401) {
      return {
        logout: true,
      };
    }

    return { error };
  },
  forgotPassword: async ({ email, returnUrl }: AuthForgotPw) => {
    try {
      console.log('called fw');
      const response = await authApi.authControllerForgotPassword({
        authForgotPasswordDto: {
          email,
          returnUrl,
        },
      });

      if (!response) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Invalid email',
        });
        throw new Error('Invalid email');
      }

      toast({
        variant: 'default',
        title: 'Success',
        description: 'Check your email for further instructions',
      });

      return {
        success: true,
        redirectTo: '/forgot-password',
        successNotification: {
          message: 'Check your email for further instructions',
          description: 'Check your email for further instructions',
        },
      };
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Invalid email',
      });
      return {
        success: false,
        error: {
          name: 'ForgotPasswordError',
          message: 'Invalid email',
        },
      };
    }
  },
};
