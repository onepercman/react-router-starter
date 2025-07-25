import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Button } from "~/shared/components/button";
import { Card } from "~/shared/components/card";
import { Input } from "~/shared/components/input";
import { PageHeader } from "~/shared/components/page-header";
import { useAuth } from "~/shared/hooks/use-auth";
import type { AuthCredentials } from "~/shared/types/auth-types";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
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
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
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
                <span className="text-xs text-red-600 mt-1 block">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
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
                <span className="text-xs text-red-600 mt-1 block">
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
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-500"
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
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <a
                href="/auth/register"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign up
              </a>
            </p>
          </div>

          {/* Demo credentials */}
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
            <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1">
              Demo credentials:
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-400">
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
