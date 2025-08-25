import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"
import type { AuthCredentials } from "~/modules/auth"
import { useAuth } from "~/modules/auth"
import { Button, Card, Input } from "~/shared/components/ui"

export default function LoginPage() {
  const navigate = useNavigate()
  const { login, isLoading, error, clearError } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<AuthCredentials>({
    defaultValues: { email: "", password: "" },
  })

  const onSubmit = async (data: AuthCredentials) => {
    clearError()
    clearErrors()
    try {
      await login(data)
      navigate("/dashboard")
    } catch {
      setError("email", { type: "manual", message: " " })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-subtle/10 via-background to-accent-subtle/10 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-lg">
        {/* Back to home */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-secondary hover:text-foreground transition-colors group"
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
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center text-2xl text-white mx-auto shadow-lg">
              🔐
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back
          </h1>
          <p className="text-secondary">Sign in to continue to your account</p>
        </div>

        {/* Login Form */}
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-background to-muted/20 backdrop-blur-sm">
          <div className="p-8">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
              noValidate
            >
              {error && (
                <div className="bg-gradient-to-r from-error-subtle to-error-muted border border-error/50 text-error px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                  <span>⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-foreground mb-3"
                  >
                    Email address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="name@company.com"
                    className="w-full h-12 bg-muted/50 border-0 focus:bg-background transition-colors"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <span className="text-xs text-error mt-2 flex items-center gap-1">
                      <span>❌</span>
                      <span>{errors.email.message}</span>
                    </span>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold text-foreground"
                    >
                      Password
                    </label>
                    <a
                      href="#"
                      className="text-xs text-primary hover:text-primary-focus font-medium transition-colors"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="w-full h-12 bg-muted/50 border-0 focus:bg-background transition-colors"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    aria-invalid={!!errors.password}
                  />
                  {errors.password && (
                    <span className="text-xs text-error mt-2 flex items-center gap-1">
                      <span>❌</span>
                      <span>{errors.password.message}</span>
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary/20 focus:ring-2 border-border rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-3 block text-sm text-secondary"
                >
                  Keep me signed in
                </label>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:from-primary-focus hover:to-accent-focus shadow-lg hover:shadow-xl transition-all duration-200 text-base font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
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
                  <span className="px-4 bg-background text-secondary">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="h-12 bg-muted/30 hover:bg-muted/50 border-0"
                >
                  <div className="flex items-center gap-2">
                    <span>🌐</span>
                    <span>Google</span>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="h-12 bg-muted/30 hover:bg-muted/50 border-0"
                >
                  <div className="flex items-center gap-2">
                    <span>📱</span>
                    <span>Apple</span>
                  </div>
                </Button>
              </div>
            </div>

            {/* Sign up link */}
            <div className="mt-8 text-center">
              <p className="text-sm text-secondary">
                Don't have an account?{" "}
                <Link
                  to="/auth/register"
                  className="font-semibold text-primary hover:text-primary-focus transition-colors"
                >
                  Create account
                </Link>
              </p>
            </div>

            {/* Demo credentials */}
            <div className="mt-6 p-4 bg-gradient-to-r from-info-subtle to-info-muted rounded-xl border border-info/20">
              <div className="flex items-start gap-3">
                <span className="text-info text-lg">💡</span>
                <div>
                  <p className="text-sm font-semibold text-info mb-1">
                    Demo Account
                  </p>
                  <div className="text-xs text-info/80 space-y-1">
                    <div>📧 test@example.com</div>
                    <div>🔑 password</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
