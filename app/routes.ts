import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  // Home page
  index("modules/home/home-page/home-page.tsx"),

  // Dashboard routes
  route("dashboard", "modules/dashboard/dashboard-overview/dashboard-page.tsx"),

  // Product routes
  route("products", "modules/products/product-list/product-list-page.tsx"),

  // Auth routes
  route("auth/login", "modules/auth/login/login-page.tsx"),
] satisfies RouteConfig;
