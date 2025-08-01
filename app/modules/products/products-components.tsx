import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
} from "~/shared/components";
import type { Product } from "./products-types";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-background to-muted/30">
      <div className="relative h-56 bg-gradient-to-br from-primary-subtle/20 to-accent-subtle/20 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-300">
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
        <div className="relative z-10">📦</div>
        {product.inStock && (
          <div className="absolute top-3 right-3 bg-success text-success-foreground px-2 py-1 text-xs font-medium rounded-full shadow-lg">
            ✓ Available
          </div>
        )}
        {!product.inStock && (
          <div className="absolute top-3 right-3 bg-error text-error-foreground px-2 py-1 text-xs font-medium rounded-full shadow-lg">
            ✗ Out of Stock
          </div>
        )}
      </div>
      
      <CardContent className="p-6">
        <div className="mb-3">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2 py-1 text-xs font-medium bg-primary-subtle text-primary rounded-full">
              {product.category}
            </span>
          </div>
        </div>
        
        <p className="text-sm text-secondary mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-primary">
              ${product.price}
            </span>
            <span className="text-xs text-secondary">Best Price</span>
          </div>
          <Button 
            size="sm" 
            disabled={!product.inStock}
            className="px-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            {product.inStock ? "Add to Cart" : "Notify Me"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function ProductFilters() {
  return (
    <div className="space-y-6">
      {/* Search */}
      <Card className="border-0 bg-gradient-to-br from-background to-primary-subtle/5">
        <CardContent className="p-4">
          <Input
            placeholder="Search products..."
            className="w-full"
            prefix={<span className="text-muted-foreground">🔍</span>}
          />
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="border-0 bg-gradient-to-br from-background to-muted/20">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <span>🎯</span>
            <span>Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Categories */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              Categories
            </label>
            <div className="space-y-2">
              {['All Categories', 'Electronics', 'Accessories', 'Home & Kitchen', 'Home & Office'].map((category) => (
                <label key={category} className="flex items-center space-x-3 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="category" 
                    className="w-4 h-4 text-primary border-border focus:ring-primary/20 focus:ring-2" 
                    defaultChecked={category === 'All Categories'}
                  />
                  <span className="text-sm text-secondary group-hover:text-foreground transition-colors">
                    {category}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              Price Range
            </label>
            <div className="space-y-2">
              {[
                { label: 'All Prices', value: 'all' },
                { label: 'Under $50', value: '0-50' },
                { label: '$50 - $100', value: '50-100' },
                { label: '$100 - $200', value: '100-200' },
                { label: 'Over $200', value: '200+' }
              ].map((price) => (
                <label key={price.value} className="flex items-center space-x-3 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="price" 
                    className="w-4 h-4 text-primary border-border focus:ring-primary/20 focus:ring-2"
                    defaultChecked={price.value === 'all'}
                  />
                  <span className="text-sm text-secondary group-hover:text-foreground transition-colors">
                    {price.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Stock Status */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              Availability
            </label>
            <label className="flex items-center space-x-3 cursor-pointer group">
              <input 
                type="checkbox" 
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary/20 focus:ring-2" 
              />
              <span className="text-sm text-secondary group-hover:text-foreground transition-colors">
                In Stock Only
              </span>
            </label>
          </div>

          {/* Clear Filters */}
          <Button variant="outlined" size="sm" className="w-full mt-4">
            Clear All Filters
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
