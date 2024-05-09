import { authProvider } from '@/providers/auth-provider/auth-provider';
import { useEffect, useState } from 'react';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const result = await authProvider.check();
      setIsAuthenticated(result.authenticated);
    };

    checkAuth();
  }, []);

  return { isAuthenticated };
}
