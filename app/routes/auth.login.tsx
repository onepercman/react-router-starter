import { useForm } from "@tanstack/react-form"
import { Globe, Key, Lightbulb, Lock, Mail, Phone, X } from "lucide-react"
import { Link, useNavigate } from "react-router"
import { z } from "zod"
import { useAuth } from "~/modules/auth"
import { Button, Card, TextField } from "~/shared/components/ui"

const loginSchema = z.object({
	email: z.string().min(1, "Email is required").email("Invalid email address"),
	password: z
		.string()
		.min(1, "Password is required")
		.min(6, "Password must be at least 6 characters"),
})

export default function LoginPage() {
	const navigate = useNavigate()
	const { login, isLoading, error, clearError } = useAuth()

	const form = useForm({
		defaultValues: { email: "", password: "" },
		validators: {
			onBlur: loginSchema,
		},
		onSubmit: async ({ value }) => {
			clearError()
			try {
				await login(value)
				navigate("/dashboard")
			} catch {
				// The form error will be displayed through the error prop from useAuth
			}
		},
	})

	return (
		<div className="container px-4 py-8">
			{/* Back to home */}
			<div className="mb-8">
				<Link
					to="/"
					className="group inline-flex items-center gap-2 text-muted-fg text-sm transition-colors hover:text-fg"
				>
					<span className="group-hover:-translate-x-0.5 transition-transform">
						←
					</span>
					<span>Back to Home</span>
				</Link>
			</div>

			{/* Header */}
			<div className="mb-8 text-center">
				<div className="mb-4">
					<div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-2xl text-primary-fg shadow-lg">
						<Lock className="size-6" />
					</div>
				</div>
				<h1 className="mb-2 font-bold text-3xl text-fg">Welcome back</h1>
				<p className="text-muted-fg">Sign in to continue to your account</p>
			</div>

			{/* Login Form */}
			<Card className="border-0 bg-gradient-to-br from-bg to-muted/20 shadow-2xl backdrop-blur-sm">
				<div className="p-8">
					<form
						onSubmit={(e) => {
							e.preventDefault()
							form.handleSubmit()
						}}
						className="space-y-6"
					>
						{error && (
							<div className="flex items-center gap-2 rounded-xl border border-danger/50 bg-gradient-to-r from-danger-subtle to-danger-subtle px-4 py-3 text-danger text-sm">
								<X className="size-4" />
								<span>{error}</span>
							</div>
						)}

						<div className="space-y-4">
							<form.Field name="email">
								{(field) => {
									return (
										<TextField
											label="Email address"
											type="email"
											autoComplete="email"
											placeholder="name@company.com"
											className="w-full"
											value={field.state.value}
											onChange={(value) => field.handleChange(value)}
											onBlur={field.handleBlur}
											name={field.name}
											isRequired
											isInvalid={!field.state.meta.isValid}
											errorMessage={field.state.meta.errors
												.map((e) => e?.message)
												.join(", ")}
										/>
									)
								}}
							</form.Field>

							<div>
								<div className="mb-2 flex items-center justify-between">
									<span></span>
									<a
										href="#"
										tabIndex={-1}
										className="font-medium text-primary text-xs transition-colors hover:text-primary"
									>
										Forgot password?
									</a>
								</div>
								<form.Field name="password">
									{(field) => (
										<TextField
											label="Password"
											type="password"
											autoComplete="current-password"
											placeholder="Enter your password"
											className="w-full"
											value={field.state.value}
											onChange={(value) => field.handleChange(value)}
											onBlur={field.handleBlur}
											name={field.name}
											isRequired
											isInvalid={!field.state.meta.isValid}
											errorMessage={field.state.meta.errors
												.map((e) => e?.message)
												.join(", ")}
										/>
									)}
								</form.Field>
							</div>
						</div>

						<Button
							type="submit"
							intent="primary"
							className="w-full"
							isPending={isLoading}
						>
							{isLoading ? (
								<div className="flex items-center gap-2">
									<div className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
									<span>Signing in...</span>
								</div>
							) : (
								<div className="flex items-center gap-2">
									<span>Sign in</span>
									<span>→</span>
								</div>
							)}
						</Button>
					</form>

					{/* Social Login Options */}
					<div className="mt-8">
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-border/50 border-t"></div>
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="bg-bg px-4 text-muted-fg">
									Or continue with
								</span>
							</div>
						</div>

						<div className="mt-6 grid grid-cols-2 gap-3">
							<Button intent="outline">
								<div className="flex items-center gap-2">
									<Globe className="size-4" />
									<span>Google</span>
								</div>
							</Button>
							<Button intent="outline">
								<div className="flex items-center gap-2">
									<Phone className="size-4" />
									<span>Apple</span>
								</div>
							</Button>
						</div>
					</div>

					{/* Sign up link */}
					<div className="mt-8 text-center">
						<p className="text-muted-fg text-sm">
							Don't have an account?{" "}
							<Link
								to="/auth/register"
								className="font-semibold text-primary transition-colors hover:text-primary"
							>
								Create account
							</Link>
						</p>
					</div>

					{/* Demo credentials */}
					<div className="mt-6 rounded-xl border border-info-subtle-fg/20 bg-gradient-to-r from-info-subtle to-info-subtle p-4">
						<div className="flex items-start gap-3">
							<Lightbulb className="size-5 text-info-subtle-fg" />
							<div>
								<p className="mb-1 font-semibold text-info-subtle-fg text-sm">
									Demo Account
								</p>
								<div className="space-y-1 text-info-subtle-fg/80 text-xs">
									<div className="flex items-center gap-2">
										<Mail className="size-3" />
										test@example.com
									</div>
									<div className="flex items-center gap-2">
										<Key className="size-3" />
										password
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Card>
		</div>
	)
}
