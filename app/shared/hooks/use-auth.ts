import { useAuthStore } from "../stores/auth-store";
import { useUserStore } from "../stores/user-store";
import type { UserPreferences, UserProfile } from "../types/user-types";

/**
 * Custom hook that provides auth-related functionality
 * Combines auth store with user store for complete auth experience
 */
export const useAuth = () => {
  const {
    user,
    tokens,
    isAuthenticated,
    isLoading: authLoading,
    error: authError,
    login,
    register,
    logout: authLogout,
    refreshAuth,
    clearError,
  } = useAuthStore();

  const { setProfile, clearProfile } = useUserStore();

  /**
   * Enhanced logout that clears both auth and user data
   */
  const logout = () => {
    authLogout();
    clearProfile();
  };

  /**
   * Initialize user profile after successful authentication
   */
  const initializeUserProfile = (user: any) => {
    if (user) {
      const defaultPreferences: UserPreferences = {
        theme: "system",
        language: "en",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        notifications: {
          email: true,
          push: true,
          marketing: false,
          security: true,
        },
      };

      const defaultStats = {
        loginCount: 1,
        lastLoginAt: new Date().toISOString(),
        activityScore: 0,
      };

      const userProfile: UserProfile = {
        ...user,
        preferences: defaultPreferences,
        stats: defaultStats,
      };

      setProfile(userProfile);
    }
  };

  /**
   * Enhanced login that also initializes user profile
   */
  const enhancedLogin = async (credentials: any) => {
    await login(credentials);
    const authState = useAuthStore.getState();
    if (authState.user) {
      initializeUserProfile(authState.user);
    }
  };

  /**
   * Enhanced register that also initializes user profile
   */
  const enhancedRegister = async (data: any) => {
    await register(data);
    const authState = useAuthStore.getState();
    if (authState.user) {
      initializeUserProfile(authState.user);
    }
  };

  return {
    // Auth state
    user,
    tokens,
    isAuthenticated,
    isLoading: authLoading,
    error: authError,

    // Auth actions
    login: enhancedLogin,
    register: enhancedRegister,
    logout,
    refreshAuth,
    clearError,

    // Utils
    hasRole: (role: string) => user?.role === role,
    isTokenExpired: () => {
      if (!tokens?.expiresAt) return true;
      return Date.now() >= tokens.expiresAt;
    },
  };
};
