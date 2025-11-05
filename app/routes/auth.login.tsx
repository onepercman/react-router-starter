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
          className="inline-flex items-center gap-2 text-sm text-muted-fg hover:text-fg transition-colors group"
        >
          <span className="group-hover:-translate-x-0.5 transition-transform">
            ←
          </span>
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="mb-4">
          <div className="size-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center text-2xl text-primary-fg mx-auto shadow-lg">
            <Lock className="size-6" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-fg mb-2">Welcome back</h1>
        <p className="text-muted-fg">Sign in to continue to your account</p>
      </div>

      {/* Login Form */}
      <Card className="border-0 shadow-2xl bg-gradient-to-br from-bg to-muted/20 backdrop-blur-sm">
        <div className="p-8">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit()
            }}
            className="space-y-6"
          >
            {error && (
              <div className="bg-gradient-to-r from-danger-subtle to-danger-subtle border border-danger/50 text-danger px-4 py-3 rounded-xl text-sm flex items-center gap-2">
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
                <div className="flex items-center justify-between mb-2">
                  <span></span>
                  <a
                    href="#"
                    tabIndex={-1}
                    className="text-xs text-primary hover:text-primary font-medium transition-colors"
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
                  <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
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
                <div className="w-full border-t border-border/50"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-bg text-muted-fg">
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
            <p className="text-sm text-muted-fg">
              Don't have an account?{" "}
              <Link
                to="/auth/register"
                className="font-semibold text-primary hover:text-primary transition-colors"
              >
                Create account
              </Link>
            </p>
          </div>

          {/* Demo credentials */}
          <div className="mt-6 p-4 bg-gradient-to-r from-info-subtle to-info-subtle rounded-xl border border-info-subtle-fg/20">
            <div className="flex items-start gap-3">
              <Lightbulb className="size-5 text-info-subtle-fg" />
              <div>
                <p className="text-sm font-semibold text-info-subtle-fg mb-1">
                  Demo Account
                </p>
                <div className="text-xs text-info-subtle-fg/80 space-y-1">
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
