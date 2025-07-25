import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type {
  AuthCredentials,
  AuthStore,
  AuthTokens,
  RegisterData,
  User,
} from "../types/auth-types";

// Mock API functions - replace with real API calls
const authAPI = {
  async login(
    credentials: AuthCredentials
  ): Promise<{ user: User; tokens: AuthTokens }> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (
      credentials.email === "test@example.com" &&
      credentials.password === "password"
    ) {
      return {
        user: {
          id: "1",
          email: credentials.email,
          name: "Test User",
          role: "user",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        tokens: {
          accessToken: "mock-access-token",
          refreshToken: "mock-refresh-token",
          expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
        },
      };
    }

    throw new Error("Invalid credentials");
  },

  async register(
    data: RegisterData
  ): Promise<{ user: User; tokens: AuthTokens }> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (data.password !== data.confirmPassword) {
      throw new Error("Passwords do not match");
    }

    return {
      user: {
        id: "2",
        email: data.email,
        name: data.name,
        role: "user",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      tokens: {
        accessToken: "mock-access-token-new",
        refreshToken: "mock-refresh-token-new",
        expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      },
    };
  },

  async refreshToken(_refreshToken: string): Promise<AuthTokens> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
      accessToken: "new-mock-access-token",
      refreshToken: "new-mock-refresh-token",
      expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    };
  },
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      tokens: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (credentials: AuthCredentials) => {
        set({ isLoading: true, error: null });

        try {
          const { user, tokens } = await authAPI.login(credentials);

          set({
            user,
            tokens,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          set({
            user: null,
            tokens: null,
            isAuthenticated: false,
            isLoading: false,
            error: error instanceof Error ? error.message : "Login failed",
          });
          throw error;
        }
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true, error: null });

        try {
          const { user, tokens } = await authAPI.register(data);

          set({
            user,
            tokens,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          set({
            user: null,
            tokens: null,
            isAuthenticated: false,
            isLoading: false,
            error:
              error instanceof Error ? error.message : "Registration failed",
          });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          tokens: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      },

      refreshAuth: async () => {
        const { tokens } = get();

        if (!tokens?.refreshToken) {
          throw new Error("No refresh token available");
        }

        set({ isLoading: true });

        try {
          const newTokens = await authAPI.refreshToken(tokens.refreshToken);

          set({
            tokens: newTokens,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          // If refresh fails, logout user
          get().logout();
          throw error;
        }
      },

      clearError: () => set({ error: null }),
      setLoading: (loading: boolean) => set({ isLoading: loading }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        user: state.user,
        tokens: state.tokens,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
