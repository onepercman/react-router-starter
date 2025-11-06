import { BarChart3, Home, Lock, Menu, Package, User } from "lucide-react"
import { Link, useLocation } from "react-router"
import { ThemeToggle } from "../components/theme-toggle"
import { Button } from "../components/ui"

interface MainLayoutProps {
	children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
	const location = useLocation()

	const navItems = [
		{ path: "/", label: "Home", icon: <Home className="size-4" /> },
		{
			path: "/dashboard",
			label: "Dashboard",
			icon: <BarChart3 className="size-4" />,
		},
		{
			path: "/products",
			label: "Products",
			icon: <Package className="size-4" />,
		},
		{
			path: "/auth/login",
			label: "Login",
			icon: <Lock className="size-4" />,
		},
	]

	return (
		<div className="flex min-h-screen flex-col">
			{/* Header */}
			<header className="sticky top-0 z-50 border-border border-b bg-bg shadow-sm">
				<div className="container px-4">
					<div className="flex h-16 items-center justify-between">
						<div className="flex items-center space-x-8">
							<Link
								to="/"
								className="font-bold text-fg text-xl transition-colors hover:text-primary"
							>
								React Router App
							</Link>
							<nav className="hidden space-x-1 md:flex">
								{navItems.map((item) => (
									<Link
										key={item.path}
										to={item.path}
										className={`flex items-center space-x-2 rounded-md px-3 py-2 font-medium text-sm transition-all duration-200 ${
											location.pathname === item.path
												? "border border-border bg-accent text-accent-fg"
												: "border border-transparent text-muted-fg hover:border-border hover:bg-accent hover:text-fg"
										}`}
									>
										<span>{item.icon}</span>
										<span>{item.label}</span>
									</Link>
								))}
							</nav>
						</div>

						<div className="flex items-center space-x-3">
							{/* Theme Toggle */}
							<ThemeToggle />

							{/* User Menu */}
							<Button intent="plain" size="sm">
								<User className="size-5" />
							</Button>

							{/* Mobile menu button */}
							<Button intent="plain" size="sm" className="md:hidden">
								<Menu className="size-5" />
							</Button>
						</div>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className="flex-1 bg-bg">{children}</main>

			{/* Footer */}
			<footer className="border-border border-t bg-bg">
				<div className="container px-4 py-6">
					<div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
						<div className="text-center md:text-left">
							<p className="text-muted-fg text-sm">
								© 2024 React Router Starter. Built with React Router v7.
							</p>
						</div>
						<div className="flex items-center space-x-4">
							<a
								href="https://github.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-muted-fg transition-colors hover:text-fg"
							>
								<span className="sr-only">GitHub</span>
								<svg className="size-5" fill="currentColor" viewBox="0 0 20 20">
									<path d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" />
								</svg>
							</a>
							<a
								href="https://reactrouter.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-muted-fg transition-colors hover:text-fg"
							>
								<span className="sr-only">React Router</span>
								<span className="font-medium text-sm">Docs</span>
							</a>
						</div>
					</div>
				</div>
			</footer>
		</div>
	)
}
