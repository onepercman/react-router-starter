import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type {
  UpdateUserData,
  UserPreferences,
  UserProfile,
  UserStore,
} from "../types/user-types";

// Mock API functions - replace with real API calls
const userAPI = {
  async updateProfile(data: UpdateUserData): Promise<UserProfile> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    // Mock current profile - in real app, get from server
    const currentProfile = useUserStore.getState().profile;
    if (!currentProfile) {
      throw new Error("No profile to update");
    }

    const updatedProfile: UserProfile = {
      ...currentProfile,
      ...data,
      updatedAt: new Date().toISOString(),
      preferences: data.preferences
        ? { ...currentProfile.preferences, ...data.preferences }
        : currentProfile.preferences,
    };

    return updatedProfile;
  },

  async updatePreferences(
    preferences: Partial<UserPreferences>
  ): Promise<UserPreferences> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const currentProfile = useUserStore.getState().profile;
    if (!currentProfile) {
      throw new Error("No profile found");
    }

    return {
      ...currentProfile.preferences,
      ...preferences,
    };
  },
};

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      // Initial state
      profile: null,
      isLoading: false,
      error: null,

      // Actions
      setProfile: (profile: UserProfile) => {
        set({ profile, error: null });
      },

      updateProfile: async (data: UpdateUserData) => {
        set({ isLoading: true, error: null });

        try {
          const updatedProfile = await userAPI.updateProfile(data);

          set({
            profile: updatedProfile,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          set({
            isLoading: false,
            error:
              error instanceof Error
                ? error.message
                : "Failed to update profile",
          });
          throw error;
        }
      },

      updatePreferences: async (preferences: Partial<UserPreferences>) => {
        const currentProfile = get().profile;
        if (!currentProfile) {
          throw new Error("No profile found");
        }

        set({ isLoading: true, error: null });

        try {
          const updatedPreferences =
            await userAPI.updatePreferences(preferences);

          set({
            profile: {
              ...currentProfile,
              preferences: updatedPreferences,
            },
            isLoading: false,
            error: null,
          });
        } catch (error) {
          set({
            isLoading: false,
            error:
              error instanceof Error
                ? error.message
                : "Failed to update preferences",
          });
          throw error;
        }
      },

      clearProfile: () => {
        set({
          profile: null,
          isLoading: false,
          error: null,
        });
      },

      setLoading: (loading: boolean) => set({ isLoading: loading }),
      setError: (error: string | null) => set({ error }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        profile: state.profile,
      }),
    }
  )
);
