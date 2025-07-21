import { route } from "@react-router/dev/routes";

export const authRoutes = [
  route("/auth/login", "modules/auth/login/login-page.tsx"),
  // Add more auth routes as needed
  // route("/auth/register", "modules/auth/register/register-page.tsx"),
  // route("/auth/forgot-password", "modules/auth/forgot-password/forgot-password-page.tsx"),
  // route("/auth/reset-password", "modules/auth/reset-password/reset-password-page.tsx"),
];
