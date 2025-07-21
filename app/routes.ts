import { type RouteConfig } from "@react-router/dev/routes";
import { authRoutes } from "./modules/auth/routes";
import { dashboardRoutes } from "./modules/dashboard/routes";
import { productRoutes } from "./modules/products/routes";

export default [
  ...dashboardRoutes,
  ...productRoutes,
  ...authRoutes,
] satisfies RouteConfig;
