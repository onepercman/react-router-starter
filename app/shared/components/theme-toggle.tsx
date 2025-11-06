import { useTheme } from "next-themes"
import { Button } from "./ui"

export function ThemeToggle() {
	const { setTheme, resolvedTheme } = useTheme()
	const isDark = resolvedTheme === "dark"

	const toggleTheme = () => {
		setTheme(isDark ? "light" : "dark")
	}

	return (
		<Button
			onClick={toggleTheme}
			intent="plain"
			size="sm"
			className="relative"
			aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
		>
			<div className="relative size-4">
				<svg
					className={`absolute inset-0 size-4 transform text-chart-4 transition-all duration-300 ${
						isDark
							? "rotate-90 scale-0 opacity-0"
							: "rotate-0 scale-100 opacity-100"
					}`}
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth={2}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
					/>
				</svg>

				<svg
					className={`absolute inset-0 size-4 transform text-accent transition-all duration-300 ${
						isDark
							? "rotate-0 scale-100 opacity-100"
							: "-rotate-90 scale-0 opacity-0"
					}`}
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth={2}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
					/>
				</svg>
			</div>
		</Button>
	)
}
