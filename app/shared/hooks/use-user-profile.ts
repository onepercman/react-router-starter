import { useUserStore } from "../stores/user-store";
import type { UpdateUserData, UserPreferences } from "../types/user-types";

/**
 * Custom hook that provides user profile management functionality
 */
export const useUserProfile = () => {
  const {
    profile,
    isLoading,
    error,
    updateProfile,
    updatePreferences,
    setError,
    clearProfile,
  } = useUserStore();

  /**
   * Update user theme preference
   */
  const updateTheme = async (theme: UserPreferences["theme"]) => {
    if (!profile) return;

    try {
      await updatePreferences({ theme });
    } catch (error) {
      console.error("Failed to update theme:", error);
      throw error;
    }
  };

  /**
   * Update notification settings
   */
  const updateNotifications = async (
    notifications: Partial<UserPreferences["notifications"]>
  ) => {
    if (!profile) return;

    try {
      await updatePreferences({
        notifications: {
          ...profile.preferences.notifications,
          ...notifications,
        },
      });
    } catch (error) {
      console.error("Failed to update notifications:", error);
      throw error;
    }
  };

  /**
   * Update basic profile information
   */
  const updateBasicInfo = async (
    data: Pick<UpdateUserData, "name" | "email" | "avatar">
  ) => {
    try {
      await updateProfile(data);
    } catch (error) {
      console.error("Failed to update profile:", error);
      throw error;
    }
  };

  /**
   * Get user initials for avatar placeholder
   */
  const getUserInitials = () => {
    if (!profile?.name) return "??";

    return profile.name
      .split(" ")
      .map(word => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join("");
  };

  /**
   * Check if user has completed profile setup
   */
  const isProfileComplete = () => {
    if (!profile) return false;

    return Boolean(
      profile.name &&
        profile.email &&
        profile.preferences.language &&
        profile.preferences.timezone
    );
  };

  return {
    // State
    profile,
    isLoading,
    error,

    // Basic actions
    updateProfile,
    updatePreferences,
    clearProfile,
    setError,

    // Convenience methods
    updateTheme,
    updateNotifications,
    updateBasicInfo,

    // Utils
    getUserInitials,
    isProfileComplete,
    hasAvatar: Boolean(profile?.avatar),
    displayName: profile?.name || profile?.email || "User",
  };
};
