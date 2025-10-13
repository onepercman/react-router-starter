import {
  ArrowLeft,
  Heart,
  Minus,
  Package,
  Plus,
  Share2,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react"
import { useState } from "react"
import { Link, useParams } from "react-router"
import type { Product } from "~/modules/products"
import { Badge, Button, Card } from "~/shared/components/ui"

export default function ProductDetailPage() {
  const { id } = useParams()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  // Mock data - trong thực tế sẽ fetch từ API dựa trên id
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
  ]

  const product = products.find((p) => p.id === Number(id))

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Package className="size-16 text-muted-fg" />
        <h2 className="text-2xl font-bold text-fg">Product not found</h2>
        <p className="text-muted-fg">
          The product you're looking for doesn't exist.
        </p>
        <Link to="/products">
          <Button intent="primary">Back to Products</Button>
        </Link>
      </div>
    )
  }

  const images = [product.image, product.image, product.image] // Mock multiple images
  const rating = 4.5
  const reviewCount = 128

  return (
    <div className="container px-4 py-8 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-fg">
        <Link to="/products" className="hover:text-fg transition-colors">
          Products
        </Link>
        <span>/</span>
        <span className="text-fg">{product.name}</span>
      </div>

      {/* Back Button */}
      <Link to="/products">
        <Button intent="plain" size="sm">
          <ArrowLeft className="size-4" />
          <span>Back to Products</span>
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <Card className="overflow-hidden border-0 shadow-xl">
            <div className="aspect-square bg-muted flex items-center justify-center">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = `https://placehold.co/600x600/e2e8f0/64748b?text=${encodeURIComponent(
                    product.name
                  )}`
                }}
              />
            </div>
          </Card>

          {/* Thumbnails */}
          <div className="grid grid-cols-3 gap-4">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                  selectedImage === idx
                    ? "border-primary shadow-lg"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} ${idx + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `https://placehold.co/200x200/e2e8f0/64748b?text=${encodeURIComponent(
                      product.name
                    )}`
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <Badge intent="secondary" className="mb-3">
              {product.category}
            </Badge>
            <h1 className="text-4xl font-bold text-fg mb-3">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`size-5 ${
                      i < Math.floor(rating)
                        ? "fill-warning text-warning"
                        : "text-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-fg">
                {rating} ({reviewCount} reviews)
              </span>
            </div>

            <p className="text-muted-fg text-lg leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-5xl font-bold text-fg">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-2xl text-muted-fg line-through">
              ${(product.price * 1.2).toFixed(2)}
            </span>
            <Badge intent="success">20% OFF</Badge>
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            {product.inStock ? (
              <>
                <div className="size-2 rounded-full bg-success animate-pulse" />
                <span className="text-success font-medium">In Stock</span>
              </>
            ) : (
              <>
                <div className="size-2 rounded-full bg-danger" />
                <span className="text-danger font-medium">Out of Stock</span>
              </>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-fg">Quantity</label>
            <div className="flex items-center gap-3">
              <Button
                intent="outline"
                size="sm"
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                isDisabled={quantity <= 1}
              >
                <Minus className="size-4" />
              </Button>
              <span className="text-xl font-semibold text-fg w-12 text-center">
                {quantity}
              </span>
              <Button
                intent="outline"
                size="sm"
                onPress={() => setQuantity(Math.min(10, quantity + 1))}
                isDisabled={quantity >= 10}
              >
                <Plus className="size-4" />
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              intent="primary"
              size="lg"
              className="flex-1"
              isDisabled={!product.inStock}
            >
              <ShoppingCart className="size-5" />
              <span>Add to Cart</span>
            </Button>
            <Button intent="outline" size="lg">
              <Heart className="size-5" />
            </Button>
            <Button intent="outline" size="lg">
              <Share2 className="size-5" />
            </Button>
          </div>

          {/* Shipping Info */}
          <Card className="bg-gradient-to-r from-info-subtle to-info-subtle border-info/20">
            <div className="p-4 flex items-start gap-3">
              <Truck className="size-5 text-info shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-info mb-1">
                  Free Shipping & Returns
                </p>
                <p className="text-sm text-info/80">
                  Get free shipping on orders over $50. Free returns within 30
                  days.
                </p>
              </div>
            </div>
          </Card>

          {/* Product Details */}
          <Card className="border-border">
            <div className="p-6 space-y-4">
              <h3 className="text-lg font-semibold text-fg">Product Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-fg">Product ID:</span>
                  <span className="text-fg font-medium">#{product.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-fg">Category:</span>
                  <span className="text-fg font-medium">
                    {product.category}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-fg">Availability:</span>
                  <span className="text-fg font-medium">
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-fg">Brand:</span>
                  <span className="text-fg font-medium">Premium Brand</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-fg mb-6">You might also like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products
            .filter(
              (p) => p.id !== product.id && p.category === product.category
            )
            .slice(0, 4)
            .map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                to={`/products/${relatedProduct.id}`}
              >
                <Card className="group hover:shadow-xl transition-all duration-300 border-0 overflow-hidden">
                  <div className="aspect-square bg-muted overflow-hidden">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = `https://placehold.co/400x400/e2e8f0/64748b?text=${encodeURIComponent(
                          relatedProduct.name
                        )}`
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-fg mb-2 group-hover:text-primary transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-2xl font-bold text-primary">
                      ${relatedProduct.price.toFixed(2)}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}
