import { route } from "@react-router/dev/routes";

export const productRoutes = [
  route("/products", "modules/products/pages/product-list-page.tsx"),
  // Add more product routes as needed
  // route("/products/:id", "modules/products/pages/product-detail-page.tsx"),
  // route("/products/create", "modules/products/pages/product-create-page.tsx"),
  // route("/products/:id/edit", "modules/products/pages/product-edit-page.tsx"),
];
