import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import type { AuthCredentials } from "~/modules/auth";
import { useAuth } from "~/modules/auth";
import { Button } from "~/shared/components/button";
import { Card } from "~/shared/components/card";
import { Input } from "~/shared/components/input";
import { PageHeader } from "~/shared/components/page-header";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<AuthCredentials>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: AuthCredentials) => {
    clearError();
    clearErrors();
    try {
      await login(data);
      navigate("/dashboard");
    } catch {
      // Error is handled by the store, but can set form error if needed
      setError("email", { type: "manual", message: " " }); // dummy to trigger error style
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <PageHeader
          title="Sign in to your account"
          description="Welcome back! Please enter your details."
        />

        <Card className="p-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            noValidate
          >
            {error && (
              <div className="bg-error-muted border border-error text-error px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Email address
              </label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                className="w-full"
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
                <span className="text-xs text-error mt-1 block">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                className="w-full"
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
                <span className="text-xs text-error mt-1 block">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-foreground"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-primary hover:text-primary-focus"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <a
                href="/auth/register"
                className="font-medium text-primary hover:text-primary-focus"
              >
                Sign up
              </a>
            </p>
          </div>

          {/* Demo credentials */}
          <div className="mt-4 p-3 bg-info-muted rounded-md">
            <p className="text-xs text-info font-medium mb-1">
              Demo credentials:
            </p>
            <p className="text-xs text-info">
              Email: test@example.com
              <br />
              Password: password
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
