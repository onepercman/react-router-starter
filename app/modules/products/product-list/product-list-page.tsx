import { useState } from "react";
import {
  Button,
  PageHeader,
  UiCard,
  UiCardContent,
  UiCardHeader,
  UiCardTitle,
} from "~/shared/components";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  description: string;
}

export default function ProductListPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Electronics",
    "Kitchen",
    "Sports",
    "Accessories",
    "Home",
  ];

  const products: Product[] = [
    {
      id: "1",
      name: "Wireless Bluetooth Headphones",
      category: "Electronics",
      price: 79.99,
      stock: 45,
      image: "🎧",
      description:
        "High-quality noise-canceling wireless headphones with 20-hour battery life.",
    },
    {
      id: "2",
      name: "Smart Coffee Maker",
      category: "Kitchen",
      price: 299.99,
      stock: 12,
      image: "☕",
      description:
        "WiFi-enabled coffee maker with programmable brewing and mobile app control.",
    },
    {
      id: "3",
      name: "Yoga Mat Pro",
      category: "Sports",
      price: 49.99,
      stock: 28,
      image: "🧘",
      description:
        "Premium non-slip yoga mat with alignment lines and extra cushioning.",
    },
    {
      id: "4",
      name: "Leather Laptop Bag",
      category: "Accessories",
      price: 129.99,
      stock: 8,
      image: "💼",
      description:
        "Handcrafted genuine leather laptop bag with multiple compartments.",
    },
    {
      id: "5",
      name: "Smart Home Hub",
      category: "Electronics",
      price: 199.99,
      stock: 35,
      image: "🏠",
      description:
        "Central hub for controlling all your smart home devices with voice commands.",
    },
    {
      id: "6",
      name: "Ceramic Dinner Set",
      category: "Kitchen",
      price: 89.99,
      stock: 18,
      image: "🍽️",
      description:
        "Beautiful 16-piece ceramic dinner set, dishwasher and microwave safe.",
    },
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(product => product.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Electronics: "bg-info-muted text-info border-info/30",
      Kitchen: "bg-warning-muted text-warning border-warning/30",
      Sports: "bg-success-muted text-success border-success/30",
      Accessories: "bg-accent-muted text-accent border-accent/30",
      Home: "bg-primary-muted text-primary border-primary/30",
    };
    return colors[category] || "bg-info-muted text-info border-info/30";
  };

  const getStockStatus = (stock: number) => {
    if (stock > 30) {
      return {
        label: "In Stock",
        color: "bg-success-muted text-success border-success/30",
        dotColor: "bg-success",
      };
    } else if (stock > 15) {
      return {
        label: "Low Stock",
        color: "bg-warning-muted text-warning border-warning/30",
        dotColor: "bg-warning",
      };
    } else {
      return {
        label: "Very Low",
        color: "bg-error-muted text-error border-error/30",
        dotColor: "bg-error",
      };
    }
  };

  return (
    <div>
      <PageHeader
        title="Product Catalog"
        description="Manage your product inventory and browse available items"
      >
        <div className="flex gap-3">
          <Button color="success">➕ Add Product</Button>
          <Button
            variant="outlined"
            onClick={() => {
              // Simulate export functionality
              alert("Export functionality would be implemented here");
            }}
          >
            📤 Export
          </Button>
        </div>
      </PageHeader>

      {/* Category Filter */}
      <UiCard className="mb-6">
        <UiCardContent className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Filter by Category
          </h3>
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted border-border hover:bg-primary-subtle hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </UiCardContent>
      </UiCard>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => {
            const stockStatus = getStockStatus(product.stock);

            return (
              <UiCard
                key={product.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-200 border border-border"
              >
                <UiCardContent className="p-0">
                  {/* Product Image */}
                  <div className="bg-gradient-to-br from-primary-subtle to-accent-subtle p-8 text-center">
                    <div className="text-6xl mb-4">{product.image}</div>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(product.category)}`}
                    >
                      {product.category}
                    </span>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Price and Stock */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-primary">
                        ${product.price}
                      </span>
                      <div className="flex items-center space-x-2">
                        <div
                          className={`w-2 h-2 rounded-full ${stockStatus.dotColor}`}
                        ></div>
                        <span
                          className={`text-xs px-2 py-1 rounded border ${stockStatus.color}`}
                        >
                          {stockStatus.label}
                        </span>
                      </div>
                    </div>

                    {/* Stock count */}
                    <div className="text-xs text-muted mb-4">
                      {product.stock} units in stock
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button size="sm" variant="outlined" className="flex-1">
                        👁️ View
                      </Button>
                      <Button size="sm" color="info" className="flex-1">
                        🛒 Add to Cart
                      </Button>
                    </div>
                  </div>
                </UiCardContent>
              </UiCard>
            );
          })}
        </div>
      ) : (
        <UiCard className="text-center py-12 border-2 border-dashed border-muted">
          <UiCardContent>
            <div className="text-4xl mb-4">📦</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No products found
            </h3>
            <p className="text-muted mb-4">
              No products match the selected category.
            </p>
            <Button color="primary" onClick={() => setSelectedCategory("All")}>
              Show All Products
            </Button>
          </UiCardContent>
        </UiCard>
      )}

      {/* Summary Card */}
      <UiCard className="mt-8 bg-gradient-to-r from-primary-subtle to-accent-subtle border-primary/30">
        <UiCardHeader>
          <UiCardTitle className="text-primary">
            📊 Inventory Summary
          </UiCardTitle>
        </UiCardHeader>
        <UiCardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">
                {products.length}
              </div>
              <div className="text-sm text-muted">Total Products</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">
                {products.filter(p => p.stock > 30).length}
              </div>
              <div className="text-sm text-muted">In Stock</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">
                {products.filter(p => p.stock <= 30 && p.stock > 15).length}
              </div>
              <div className="text-sm text-muted">Low Stock</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-error">
                {products.filter(p => p.stock <= 15).length}
              </div>
              <div className="text-sm text-muted">Very Low</div>
            </div>
          </div>
        </UiCardContent>
      </UiCard>
    </div>
  );
}
