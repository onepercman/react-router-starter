import { IconMoon, IconSettings, IconSun } from "@intentui/icons"
import { useTheme } from "next-themes"
import { useAuth } from "~/modules/auth"
import { useUserProfile } from "~/modules/user"
import { Button } from "./ui"

export function AuthStatus() {
  const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth()
  const { isLoading: profileLoading } = useUserProfile(user?.id)
  const { theme, setTheme, resolvedTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  if (authLoading || profileLoading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="animate-spin rounded-full size-4 border-b-2 border-fg"></div>
        <span className="text-sm text-muted-fg">Loading...</span>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-sm text-muted-fg">Not signed in</span>
        <Button intent="outline" size="sm">
          <a href="/auth/login">Sign in</a>
        </Button>
      </div>
    )
  }

  const getUserInitials = () => {
    if (!user.name) return user.email.charAt(0).toUpperCase()
    return user.name
      .split(" ")
      .map((n) => n.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const displayName = user.name || user.email

  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center space-x-2">
        <div className="size-8 bg-primary text-primary-fg rounded-full flex items-center justify-center text-sm font-medium">
          {getUserInitials()}
        </div>
        <div className="hidden sm:block">
          <p className="text-sm font-medium text-fg">{displayName}</p>
          <p className="text-xs text-muted-fg">{user.role}</p>
        </div>
      </div>

      <Button
        intent="plain"
        size="sm"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <IconMoon className="size-4" />
        ) : (
          <IconSun className="size-4" />
        )}
      </Button>

      <div className="relative">
        <Button intent="plain" size="sm">
          <IconSettings className="size-4" />
        </Button>
      </div>

      <Button intent="outline" size="sm" onClick={logout}>
        Sign out
      </Button>
    </div>
  )
}
