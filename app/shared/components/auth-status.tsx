import { Moon, Settings, Sun } from "lucide-react"
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
				<div className="size-4 animate-spin rounded-full border-fg border-b-2"></div>
				<span className="text-muted-fg text-sm">Loading...</span>
			</div>
		)
	}

	if (!isAuthenticated || !user) {
		return (
			<div className="flex items-center space-x-2">
				<span className="text-muted-fg text-sm">Not signed in</span>
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
				<div className="flex size-8 items-center justify-center rounded-full bg-primary font-medium text-primary-fg text-sm">
					{getUserInitials()}
				</div>
				<div className="hidden sm:block">
					<p className="font-medium text-fg text-sm">{displayName}</p>
					<p className="text-muted-fg text-xs">{user.role}</p>
				</div>
			</div>

			<Button
				intent="plain"
				size="sm"
				onClick={toggleTheme}
				aria-label="Toggle theme"
			>
				{theme === "dark" ? (
					<Moon className="size-4" />
				) : (
					<Sun className="size-4" />
				)}
			</Button>

			<div className="relative">
				<Button intent="plain" size="sm">
					<Settings className="size-4" />
				</Button>
			</div>

			<Button intent="outline" size="sm" onClick={logout}>
				Sign out
			</Button>
		</div>
	)
}
