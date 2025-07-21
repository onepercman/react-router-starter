import { route } from "@react-router/dev/routes";

export const productRoutes = [
  route("/products", "modules/products/product-list/product-list-page.tsx"),
  // Add more product routes as needed
  // route("/products/:id", "modules/products/product-detail/product-detail-page.tsx"),
  // route("/products/create", "modules/products/product-create/product-create-page.tsx"),
  // route("/products/:id/edit", "modules/products/product-edit/product-edit-page.tsx"),
];
