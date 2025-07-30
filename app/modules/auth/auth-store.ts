import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { api } from "~/shared/api/base-client";
import type { AuthCredentials, AuthResponse, User } from "./auth-types";

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: AuthCredentials) => Promise<void>;
  logout: () => void;
  register: (credentials: AuthCredentials) => Promise<void>;
  refreshToken: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      login: async (credentials: AuthCredentials) => {
        set({ isLoading: true, error: null });

        try {
          const response = await api.post<AuthResponse>(
            "/auth/login",
            credentials
          );
          const { user, token } = response;

          set({
            user,
            token,
            isLoading: false,
            error: null,
          });

          api.setAuthToken(token);
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || "Login failed";
          set({
            isLoading: false,
            error: errorMessage,
          });
          throw new Error(errorMessage);
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          error: null,
        });

        api.clearAuthToken();
      },

      register: async (credentials: AuthCredentials) => {
        set({ isLoading: true, error: null });

        try {
          const response = await api.post<AuthResponse>(
            "/auth/register",
            credentials
          );
          const { user, token } = response;

          set({
            user,
            token,
            isLoading: false,
            error: null,
          });

          api.setAuthToken(token);
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message || "Registration failed";
          set({
            isLoading: false,
            error: errorMessage,
          });
          throw new Error(errorMessage);
        }
      },

      refreshToken: async () => {
        const { token } = get();
        if (!token) return;

        try {
          const response = await api.post<AuthResponse>("/auth/refresh", {
            token,
          });
          const { user, token: newToken } = response;

          set({
            user,
            token: newToken,
          });

          api.setAuthToken(newToken);
        } catch (error: any) {
          get().logout();
        }
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        user: state.user,
        token: state.token,
      }),
    }
  )
);
