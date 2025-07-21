import { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Input, UiCard, UiCardContent } from "~/shared/components";

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-secondary">
            Welcome back! Please enter your details.
          </p>
        </div>

        <UiCard className="p-8 border border-border bg-card">
          <UiCardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Email address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  variant="outlined"
                  size="lg"
                />
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
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  variant="outlined"
                  size="lg"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-primary focus:ring-ring border-input rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-foreground"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Button
                    variant="ghost"
                    color="primary"
                    size="sm"
                    className="h-auto p-0"
                  >
                    Forgot your password?
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                color="primary"
                loading={isLoading}
                loadingText="Signing in..."
                disabled={!formData.email || !formData.password}
              >
                Sign in
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-card text-secondary">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button variant="outlined" type="button" className="w-full">
                  <span className="sr-only">Sign in with Google</span>
                  🔍 Google
                </Button>
                <Button variant="outlined" type="button" className="w-full">
                  <span className="sr-only">Sign in with GitHub</span>
                  🐙 GitHub
                </Button>
              </div>
            </div>

            <p className="mt-6 inline-flex items-center justify-center text-sm text-secondary w-full gap-2">
              <span>Don't have an account?</span>
              <Button
                variant="ghost"
                color="primary"
                size="sm"
                className="h-auto p-0 font-medium"
              >
                Sign up
              </Button>
            </p>
          </UiCardContent>
        </UiCard>
      </div>
    </div>
  );
}
