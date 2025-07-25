import { useAuth } from "../hooks/use-auth";
import { useUserProfile } from "../hooks/use-user-profile";
import { Button } from "./button";

export function AuthStatus() {
  const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();

  const { profile, getUserInitials, displayName, updateTheme } =
    useUserProfile();

  if (authLoading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
        <span className="text-sm text-gray-600">Loading...</span>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">Not signed in</span>
        <Button variant="outlined" size="sm">
          <a href="/auth/login">Sign in</a>
        </Button>
      </div>
    );
  }

  const handleThemeToggle = async () => {
    const currentTheme = profile?.preferences.theme || "system";
    const newTheme = currentTheme === "light" ? "dark" : "light";

    try {
      await updateTheme(newTheme);
    } catch (error) {
      console.error("Failed to update theme:", error);
    }
  };

  return (
    <div className="flex items-center space-x-3">
      {/* User Avatar */}
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
          {getUserInitials()}
        </div>
        <div className="hidden sm:block">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {displayName}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {user.role}
          </p>
        </div>
      </div>

      {/* Theme Toggle */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleThemeToggle}
        title="Toggle theme"
      >
        {profile?.preferences.theme === "dark" ? "🌙" : "☀️"}
      </Button>

      {/* User Menu */}
      <div className="relative">
        <Button variant="ghost" size="sm">
          ⚙️
        </Button>
      </div>

      {/* Logout */}
      <Button variant="outlined" size="sm" onClick={logout}>
        Sign out
      </Button>
    </div>
  );
}
