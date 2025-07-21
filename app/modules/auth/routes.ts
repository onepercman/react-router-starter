import { route } from "@react-router/dev/routes";

export const authRoutes = [
  route("/auth/login", "modules/auth/pages/login-page.tsx"),
  // Add more auth routes as needed
  // route("/auth/register", "modules/auth/pages/register-page.tsx"),
  // route("/auth/forgot-password", "modules/auth/pages/forgot-password-page.tsx"),
  // route("/auth/reset-password", "modules/auth/pages/reset-password-page.tsx"),
];
