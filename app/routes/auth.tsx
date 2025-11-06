import { Outlet } from "react-router"

export default function AuthLayout() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-subtle/10 via-background to-accent-subtle/10 p-4">
			{/* Background decoration */}
			<div className="pointer-events-none absolute inset-0 overflow-hidden">
				<div className="-top-40 -right-40 absolute size-80 rounded-full bg-primary/5 blur-3xl"></div>
				<div className="-bottom-40 -left-40 absolute size-80 rounded-full bg-accent/5 blur-3xl"></div>
			</div>

			<div className="relative w-full max-w-lg">
				<Outlet />
			</div>
		</div>
	)
}
