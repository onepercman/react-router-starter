import { useState } from "react";
import {
  ModuleErrorBoundary,
  PageHeader,
  UiButton,
  UiCard,
  UiCardContent,
} from "~/shared/components";

// Loader function for React Router v7
export async function loader() {
  return null;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image: string;
}

export function ProductListPage() {
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: "Wireless Headphones",
      description: "High-quality wireless headphones with noise cancellation",
      price: 199.99,
      category: "Electronics",
      stock: 45,
      image: "🎧",
    },
    {
      id: 2,
      name: "Smart Watch",
      description: "Feature-rich smartwatch with health tracking",
      price: 299.99,
      category: "Electronics",
      stock: 23,
      image: "⌚",
    },
    {
      id: 3,
      name: "Coffee Maker",
      description: "Automatic coffee maker with programmable settings",
      price: 89.99,
      category: "Kitchen",
      stock: 12,
      image: "☕",
    },
    {
      id: 4,
      name: "Running Shoes",
      description: "Comfortable running shoes for daily exercise",
      price: 129.99,
      category: "Sports",
      stock: 67,
      image: "👟",
    },
    {
      id: 5,
      name: "Laptop Backpack",
      description: "Durable laptop backpack with multiple compartments",
      price: 59.99,
      category: "Accessories",
      stock: 34,
      image: "🎒",
    },
    {
      id: 6,
      name: "Desk Lamp",
      description: "LED desk lamp with adjustable brightness",
      price: 39.99,
      category: "Home",
      stock: 18,
      image: "💡",
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    ...Array.from(new Set(products.map(p => p.category))),
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(p => p.category === selectedCategory);

  return (
    <ModuleErrorBoundary moduleName="Products">
      <div>
        <PageHeader
          title="Products"
          description="Manage your product inventory"
        >
          <UiButton>➕ Add Product</UiButton>
        </PageHeader>

        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <UiButton
                key={category}
                variant={selectedCategory === category ? "primary" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </UiButton>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <UiCard
              key={product.id}
              shadow="sm"
              padding="sm"
              className="hover:shadow-md transition-shadow"
            >
              <UiCardContent>
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{product.image}</div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full ${
                        product.stock > 20
                          ? "bg-green-100 text-green-800"
                          : product.stock > 10
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.stock} in stock
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-bold text-gray-900">
                      ${product.price}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <UiButton size="sm" variant="outline" className="flex-1">
                      Edit
                    </UiButton>
                    <UiButton size="sm" className="flex-1">
                      View
                    </UiButton>
                  </div>
                </div>
              </UiCardContent>
            </UiCard>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <UiCard className="text-center py-12">
            <UiCardContent>
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-600 mb-4">
                No products match the selected category.
              </p>
              <UiButton onClick={() => setSelectedCategory("All")}>
                Show All Products
              </UiButton>
            </UiCardContent>
          </UiCard>
        )}
      </div>
    </ModuleErrorBoundary>
  );
}
