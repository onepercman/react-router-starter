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
			<div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4">
				<Package className="size-16 text-muted-fg" />
				<h2 className="font-bold text-2xl text-fg">Product not found</h2>
				<p className="text-muted-fg">
					The product you're looking for doesn't exist.
				</p>
				<Link to="/products">
					<Button intent="primary">Back to Products</Button>
				</Link>
			</div>
		)
	}

	const images = [product.image, product.image, product.image]
	const rating = 4.5
	const reviewCount = 128

	return (
		<div className="container space-y-8 px-4 py-8">
			<div className="flex items-center gap-2 text-muted-fg text-sm">
				<Link to="/products" className="transition-colors hover:text-fg">
					Products
				</Link>
				<span>/</span>
				<span className="text-fg">{product.name}</span>
			</div>

			<Link to="/products">
				<Button intent="plain" size="sm">
					<ArrowLeft className="size-4" />
					<span>Back to Products</span>
				</Button>
			</Link>

			<div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
				<div className="space-y-4">
					<Card className="overflow-hidden border-0 shadow-xl">
						<div className="flex aspect-square items-center justify-center bg-muted">
							<img
								src={images[selectedImage]}
								alt={product.name}
								className="h-full w-full object-cover"
								onError={(e) => {
									e.currentTarget.src = `https://placehold.co/600x600/e2e8f0/64748b?text=${encodeURIComponent(
										product.name,
									)}`
								}}
							/>
						</div>
					</Card>

					<div className="grid grid-cols-3 gap-4">
						{images.map((img, idx) => (
							<button
								key={idx}
								onClick={() => setSelectedImage(idx)}
								className={`aspect-square overflow-hidden rounded-xl border-2 transition-all ${
									selectedImage === idx
										? "border-primary shadow-lg"
										: "border-border hover:border-primary/50"
								}`}
							>
								<img
									src={img}
									alt={`${product.name} ${idx + 1}`}
									className="h-full w-full object-cover"
									onError={(e) => {
										e.currentTarget.src = `https://placehold.co/200x200/e2e8f0/64748b?text=${encodeURIComponent(
											product.name,
										)}`
									}}
								/>
							</button>
						))}
					</div>
				</div>

				<div className="space-y-6">
					<div>
						<Badge intent="secondary" className="mb-3">
							{product.category}
						</Badge>
						<h1 className="mb-3 font-bold text-4xl text-fg">{product.name}</h1>

						<div className="mb-4 flex items-center gap-3">
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
							<span className="text-muted-fg text-sm">
								{rating} ({reviewCount} reviews)
							</span>
						</div>

						<p className="text-lg text-muted-fg leading-relaxed">
							{product.description}
						</p>
					</div>

					<div className="flex items-baseline gap-3">
						<span className="font-bold text-5xl text-fg">
							${product.price.toFixed(2)}
						</span>
						<span className="text-2xl text-muted-fg line-through">
							${(product.price * 1.2).toFixed(2)}
						</span>
						<Badge intent="success">20% OFF</Badge>
					</div>

					<div className="flex items-center gap-2">
						{product.inStock ? (
							<>
								<div className="size-2 animate-pulse rounded-full bg-success" />
								<span className="font-medium text-success">In Stock</span>
							</>
						) : (
							<>
								<div className="size-2 rounded-full bg-danger" />
								<span className="font-medium text-danger">Out of Stock</span>
							</>
						)}
					</div>

					<div className="space-y-3">
						<label className="font-medium text-fg text-sm">Quantity</label>
						<div className="flex items-center gap-3">
							<Button
								intent="outline"
								size="sm"
								onPress={() => setQuantity(Math.max(1, quantity - 1))}
								isDisabled={quantity <= 1}
							>
								<Minus className="size-4" />
							</Button>
							<span className="w-12 text-center font-semibold text-fg text-xl">
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

					<Card className="border-info/20 bg-gradient-to-r from-info-subtle to-info-subtle">
						<div className="flex items-start gap-3 p-4">
							<Truck className="mt-1 size-5 shrink-0 text-info" />
							<div>
								<p className="mb-1 font-semibold text-info">
									Free Shipping & Returns
								</p>
								<p className="text-info/80 text-sm">
									Get free shipping on orders over $50. Free returns within 30
									days.
								</p>
							</div>
						</div>
					</Card>

					<Card className="border-border">
						<div className="space-y-4 p-6">
							<h3 className="font-semibold text-fg text-lg">Product Details</h3>
							<div className="space-y-3 text-sm">
								<div className="flex justify-between">
									<span className="text-muted-fg">Product ID:</span>
									<span className="font-medium text-fg">#{product.id}</span>
								</div>
								<div className="flex justify-between">
									<span className="text-muted-fg">Category:</span>
									<span className="font-medium text-fg">
										{product.category}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-muted-fg">Availability:</span>
									<span className="font-medium text-fg">
										{product.inStock ? "In Stock" : "Out of Stock"}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-muted-fg">Brand:</span>
									<span className="font-medium text-fg">Premium Brand</span>
								</div>
							</div>
						</div>
					</Card>
				</div>
			</div>

			<div className="mt-16">
				<h2 className="mb-6 font-bold text-2xl text-fg">You might also like</h2>
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{products
						.filter(
							(p) => p.id !== product.id && p.category === product.category,
						)
						.slice(0, 4)
						.map((relatedProduct) => (
							<Link
								key={relatedProduct.id}
								to={`/products/${relatedProduct.id}`}
							>
								<Card className="group overflow-hidden border-0 transition-all duration-300 hover:shadow-xl">
									<div className="aspect-square overflow-hidden bg-muted">
										<img
											src={relatedProduct.image}
											alt={relatedProduct.name}
											className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
											onError={(e) => {
												e.currentTarget.src = `https://placehold.co/400x400/e2e8f0/64748b?text=${encodeURIComponent(
													relatedProduct.name,
												)}`
											}}
										/>
									</div>
									<div className="p-4">
										<h3 className="mb-2 font-semibold text-fg transition-colors group-hover:text-primary">
											{relatedProduct.name}
										</h3>
										<p className="font-bold text-2xl text-primary">
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
