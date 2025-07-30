import { useAuth } from "~/modules/auth";
import { useDarkMode } from "~/modules/theme";
import { useUserProfile } from "~/modules/user";
import { Button } from "./button";

export function AuthStatus() {
  const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();
  const { profile, isLoading: profileLoading } = useUserProfile(user?.id);
  const { theme, toggleTheme } = useDarkMode();

  if (authLoading || profileLoading) {
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

  const getUserInitials = () => {
    if (!user.name) return user.email.charAt(0).toUpperCase();
    return user.name
      .split(" ")
      .map(n => n.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const displayName = user.name || user.email;

  return (
    <div className="flex items-center space-x-3">
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

      <Button
        variant="ghost"
        size="sm"
        onClick={toggleTheme}
        title="Toggle theme"
      >
        {theme === "dark" ? "🌙" : "☀️"}
      </Button>

      <div className="relative">
        <Button variant="ghost" size="sm">
          ⚙️
        </Button>
      </div>

      <Button variant="outlined" size="sm" onClick={logout}>
        Sign out
      </Button>
    </div>
  );
}
