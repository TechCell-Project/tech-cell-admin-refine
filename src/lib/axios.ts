import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { authProvider } from '@/providers/auth-provider/auth-provider';

const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${authProvider.getAuthData()?.accessToken || ''}`,
  },
});

// Function that will be called to refresh authorization
const refreshAuthLogic = (failedRequest: any) =>
  authProvider.refresh().then((tokenRefreshResponse) => {
    axiosInstance.defaults.headers['Authorization'] =
      'Bearer ' + tokenRefreshResponse.tokenData?.accessToken;
    failedRequest.response.config.headers['Authorization'] =
      'Bearer ' + tokenRefreshResponse.tokenData?.accessToken;
    return Promise.resolve();
  });

// Instantiate the interceptor
createAuthRefreshInterceptor(axiosInstance, refreshAuthLogic);

export default axiosInstance;
