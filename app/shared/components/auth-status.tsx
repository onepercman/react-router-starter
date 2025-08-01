import { useTheme } from "next-themes";
import { useAuth } from "~/modules/auth";
import { useUserProfile } from "~/modules/user";
import { Button } from "./button";

export function AuthStatus() {
  const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();
  const { isLoading: profileLoading } = useUserProfile(user?.id);
  const { theme, setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  if (authLoading || profileLoading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-foreground"></div>
        <span className="text-sm text-muted-foreground">Loading...</span>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-sm text-muted-foreground">Not signed in</span>
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
      .map((n) => n.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const displayName = user.name || user.email;

  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
          {getUserInitials()}
        </div>
        <div className="hidden sm:block">
          <p className="text-sm font-medium text-foreground">{displayName}</p>
          <p className="text-xs text-muted-foreground">{user.role}</p>
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
