import type { Product } from "~/modules/products";
import { ProductFilters, ProductGrid } from "~/modules/products";
import { Button, PageHeader } from "~/shared/components";

export default function ProductsPage() {
  const products: Product[] = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 99.99,
      category: "Electronics",
      image: "/images/headphones.jpg",
      inStock: true,
      description: "High-quality wireless headphones with noise cancellation",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 199.99,
      category: "Electronics",
      image: "/images/watch.jpg",
      inStock: true,
      description: "Feature-rich smartwatch with health monitoring",
    },
    {
      id: 3,
      name: "Backpack",
      price: 49.99,
      category: "Accessories",
      image: "/images/backpack.jpg",
      inStock: false,
      description: "Durable backpack perfect for travel and daily use",
    },
    {
      id: 4,
      name: "Coffee Maker",
      price: 129.99,
      category: "Home & Kitchen",
      image: "/images/coffee.jpg",
      inStock: true,
      description: "Premium coffee maker with programmable features",
    },
    {
      id: 5,
      name: "Desk Lamp",
      price: 39.99,
      category: "Home & Office",
      image: "/images/lamp.jpg",
      inStock: true,
      description: "Modern LED desk lamp with adjustable brightness",
    },
    {
      id: 6,
      name: "Bluetooth Speaker",
      price: 79.99,
      category: "Electronics",
      image: "/images/speaker.jpg",
      inStock: true,
      description: "Portable Bluetooth speaker with excellent sound quality",
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Products"
        description="Discover our curated collection of premium products"
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <Button color="primary" className="shadow-lg">
            <span>➕</span>
            <span>Add Product</span>
          </Button>
          <Button variant="outlined" className="shadow-sm">
            <span>📊</span>
            <span>Export</span>
          </Button>
        </div>
      </PageHeader>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-primary-subtle to-primary-muted p-4 rounded-xl border border-primary/20">
          <div className="text-2xl font-bold text-primary">{products.length}</div>
          <div className="text-sm text-primary/70">Total Products</div>
        </div>
        <div className="bg-gradient-to-br from-success-subtle to-success-muted p-4 rounded-xl border border-success/20">
          <div className="text-2xl font-bold text-success">{products.filter(p => p.inStock).length}</div>
          <div className="text-sm text-success/70">In Stock</div>
        </div>
        <div className="bg-gradient-to-br from-info-subtle to-info-muted p-4 rounded-xl border border-info/20">
          <div className="text-2xl font-bold text-info">{new Set(products.map(p => p.category)).size}</div>
          <div className="text-sm text-info/70">Categories</div>
        </div>
        <div className="bg-gradient-to-br from-accent-subtle to-accent-muted p-4 rounded-xl border border-accent/20">
          <div className="text-2xl font-bold text-accent">${Math.round(products.reduce((sum, p) => sum + p.price, 0) / products.length)}</div>
          <div className="text-sm text-accent/70">Avg Price</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <ProductFilters />
        </div>

        <div className="lg:col-span-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold text-foreground">All Products</h2>
              <span className="px-3 py-1 bg-muted text-secondary text-sm rounded-full">
                {products.length} items
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-secondary">Sort by:</span>
              <select className="bg-background border border-border rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary">
                <option>Newest</option>
                <option>Price: Low to High</option>  
                <option>Price: High to Low</option>
                <option>Name A-Z</option>
              </select>
            </div>
          </div>
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
}
