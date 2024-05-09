'use client';

import { AuthProvider, UpdatePasswordFormTypes } from '@refinedev/core';
import {
  AuthApi,
  AuthEmailLoginDto,
  LoginResponseDto,
  RefreshTokenResponseDto,
} from '@techcell/node-sdk';
import Cookies from 'js-cookie';
import { toast } from '@/components/ui/use-toast';
import { AuthActionResponse } from '@refinedev/core/dist/contexts/auth/types';
import { AuthForgotPw, AuthResetPassword } from '@/components/validators';
import { AxiosError } from 'axios';

export type UpdatePasswordTypes =
  | {
      type: 'reset';
      data: AuthResetPassword;
    }
  | {
      type: 'update';
      data: UpdatePasswordFormTypes & { oldPassword: string };
    };

const authApi = new AuthApi();

export const authProvider: AuthProvider & {
  refresh: () => Promise<AuthActionResponse & { tokenData?: RefreshTokenResponseDto }>;
  getAuthData: () => LoginResponseDto | null;
  resetPassword: (data: AuthResetPassword) => Promise<AuthActionResponse>;
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
  resetPassword: async ({ hash, password }: AuthResetPassword) => {
    try {
      const res = await authApi.authControllerResetPassword({
        authResetPasswordDto: {
          hash,
          password,
        },
      });

      toast({
        variant: 'default',
        title: 'Thành công',
        description: 'Yêu cầu đặt lại thành công, vui lòng kiểm tra email của bạn',
      });

      return {
        success: true,
        redirectTo: '/login',
        successNotification: {
          message: 'Yêu cầu đặt lại thành công, vui lòng kiểm tra email của bạn',
          description: 'Yêu cầu đặt lại thành công, vui lòng kiểm tra email của bạn',
        },
      };
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Thất bại',
        description: 'Yêu cầu đặt lại không thành công, vui lòng thử lại sau',
      });
      return {
        success: false,
        error: {
          name: 'ResetPasswordError',
          message: 'Yêu cầu đặt lại không thành công, vui lòng thử lại sau',
        },
      };
    }
  },
  updatePassword: async ({ type, data }: UpdatePasswordTypes) => {
    try {
      switch (type) {
        case 'reset': {
          await authApi.authControllerResetPassword({
            authResetPasswordDto: {
              hash: data.hash,
              password: data.password,
            },
          });

          toast({
            variant: 'default',
            title: 'Thành công',
            description: 'Mật khẩu đã được đặt lại thành công',
          });
          return {
            success: true,
            redirectTo: '/login',
          };
        }
        case 'update': {
          const auth = Cookies.get('auth');
          const parsedUser: LoginResponseDto = auth ? JSON.parse(auth) : null;

          await authApi.authControllerUpdateMe(
            {
              authUpdateDto: {
                password: data.password,
                oldPassword: data.oldPassword,
              },
            },
            {
              headers: {
                Authorization: `Bearer ${parsedUser?.accessToken}`,
              },
            },
          );

          toast({
            variant: 'default',
            title: 'Thành công',
            description: 'Password change successfully',
          });
          return {
            success: true,
            redirectTo: '/',
          };
        }
        default:
          toast({
            variant: 'destructive',
            title: 'Thất bại',
            description: 'Yêu cầu không hợp lệ',
          });
          return {
            success: false,
          };
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data?.code === 'auth.invalidHash') {
          toast({
            variant: 'destructive',
            title: 'Thất bại',
            description: 'Yêu cầu không hợp lệ hoặc đã hết hạn',
          });

          return {
            success: false,
          };
        }
      }

      toast({
        variant: 'destructive',
        title: 'Thất bại',
        description: 'Đổi mật khẩu không thành công',
      });

      return {
        success: false,
      };
    }
  },
};
