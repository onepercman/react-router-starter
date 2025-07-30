import { useCallback, useEffect } from "react";
import { useAuthStore } from "./auth-store";
import type { AuthCredentials, RegisterCredentials } from "./auth-types";

export const useAuth = () => {
  const {
    user,
    token,
    isLoading,
    error,
    login,
    logout,
    register,
    refreshToken,
    clearError,
  } = useAuthStore();

  const isAuthenticated = !!user && !!token;

  useEffect(() => {
    if (isAuthenticated) {
      refreshToken();
    }
  }, [isAuthenticated, refreshToken]);

  const handleLogin = useCallback(
    async (credentials: AuthCredentials) => {
      try {
        await login(credentials);
        return { success: true };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Login failed",
        };
      }
    },
    [login]
  );

  const handleRegister = useCallback(
    async (credentials: RegisterCredentials) => {
      try {
        await register(credentials);
        return { success: true };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Registration failed",
        };
      }
    },
    [register]
  );

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
    refreshToken,
    clearError,
  };
};
