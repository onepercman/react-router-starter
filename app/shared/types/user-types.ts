import type { User } from "./auth-types";

export interface UserProfile extends User {
  preferences: UserPreferences;
  stats: UserStats;
}

export interface UserPreferences {
  theme: "light" | "dark" | "system";
  language: string;
  timezone: string;
  notifications: NotificationSettings;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  marketing: boolean;
  security: boolean;
}

export interface UserStats {
  loginCount: number;
  lastLoginAt: string;
  activityScore: number;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  avatar?: string;
  preferences?: Partial<UserPreferences>;
}

export interface UserState {
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
}

export interface UserActions {
  setProfile: (profile: UserProfile) => void;
  updateProfile: (data: UpdateUserData) => Promise<void>;
  updatePreferences: (preferences: Partial<UserPreferences>) => Promise<void>;
  clearProfile: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export type UserStore = UserState & UserActions;
