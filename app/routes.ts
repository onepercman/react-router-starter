import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  // Home page
  index("routes/_index.tsx"),

  // Dashboard routes
  route("dashboard", "routes/dashboard/index.tsx"),

  // Product routes
  route("products", "routes/products/index.tsx"),

  // Auth routes
  route("auth/login", "routes/auth.login/index.tsx"),
] satisfies RouteConfig;
