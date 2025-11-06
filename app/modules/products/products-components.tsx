import { Check, Filter, Package, X } from "lucide-react"
import { Link } from "react-router"
import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Input,
} from "~/shared/components/ui"
import type { Product } from "./products-types"

interface ProductGridProps {
	products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
			{products.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	)
}

interface ProductCardProps {
	product: Product
}

export function ProductCard({ product }: ProductCardProps) {
	return (
		<Link to={`/products/${product.id}`}>
			<Card className="group overflow-hidden border-0 bg-gradient-to-br from-bg to-muted/30 transition-all duration-300 hover:shadow-lg">
				<div className="relative flex h-56 items-center justify-center bg-gradient-to-br from-muted to-accent text-6xl transition-transform duration-300 group-hover:scale-105">
					<div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
					<Package className="size-16 text-muted-fg" />
					{product.inStock && (
						<div className="absolute top-3 right-3 rounded-full bg-success px-2 py-1 font-medium text-success-fg text-xs shadow-lg">
							<Check className="size-3" /> Available
						</div>
					)}
					{!product.inStock && (
						<div className="absolute top-3 right-3 rounded-full bg-danger px-2 py-1 font-medium text-danger-fg text-xs shadow-lg">
							<X className="size-3" /> Out of Stock
						</div>
					)}
				</div>

				<CardContent className="p-6">
					<div className="mb-3">
						<div className="mb-2 flex items-start justify-between">
							<h3 className="line-clamp-1 font-semibold text-fg text-lg transition-colors group-hover:text-primary">
								{product.name}
							</h3>
						</div>
						<div className="mb-3 flex items-center gap-2">
							<span className="rounded-full bg-accent px-2 py-1 font-medium text-accent-fg text-xs">
								{product.category}
							</span>
						</div>
					</div>

					<p className="mb-4 line-clamp-2 text-muted-fg text-sm leading-relaxed">
						{product.description}
					</p>

					<div className="flex items-center justify-between">
						<div className="flex flex-col">
							<span className="font-bold text-2xl text-primary">
								${product.price}
							</span>
							<span className="text-muted-fg text-xs">Best Price</span>
						</div>
						<Button
							size="sm"
							isDisabled={!product.inStock}
							className="px-6 shadow-lg transition-shadow hover:shadow-xl"
						>
							{product.inStock ? "Add to Cart" : "Notify Me"}
						</Button>
					</div>
				</CardContent>
			</Card>
		</Link>
	)
}

export function ProductFilters() {
	return (
		<div className="space-y-6">
			{/* Search */}
			<Card className="border-0 bg-gradient-to-br from-bg to-muted">
				<CardContent className="p-4">
					<Input placeholder="Search products..." className="w-full" />
				</CardContent>
			</Card>

			{/* Filters */}
			<Card className="border-0 bg-gradient-to-br from-bg to-muted/20">
				<CardHeader className="pb-4">
					<CardTitle className="flex items-center gap-2 text-lg">
						<Filter className="size-5" />
						<span>Filters</span>
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-6">
					{/* Categories */}
					<div>
						<label className="mb-3 block font-semibold text-fg text-sm">
							Categories
						</label>
						<div className="space-y-2">
							{[
								"All Categories",
								"Electronics",
								"Accessories",
								"Home & Kitchen",
								"Home & Office",
							].map((category) => (
								<label
									key={category}
									className="group flex cursor-pointer items-center space-x-3"
								>
									<input
										type="radio"
										name="category"
										className="size-4 border-border text-primary focus:ring-2 focus:ring-primary/20"
										defaultChecked={category === "All Categories"}
									/>
									<span className="text-muted-fg text-sm transition-colors group-hover:text-fg">
										{category}
									</span>
								</label>
							))}
						</div>
					</div>

					{/* Price Range */}
					<div>
						<label className="mb-3 block font-semibold text-fg text-sm">
							Price Range
						</label>
						<div className="space-y-2">
							{[
								{ label: "All Prices", value: "all" },
								{ label: "Under $50", value: "0-50" },
								{ label: "$50 - $100", value: "50-100" },
								{ label: "$100 - $200", value: "100-200" },
								{ label: "Over $200", value: "200+" },
							].map((price) => (
								<label
									key={price.value}
									className="group flex cursor-pointer items-center space-x-3"
								>
									<input
										type="radio"
										name="price"
										className="size-4 border-border text-primary focus:ring-2 focus:ring-primary/20"
										defaultChecked={price.value === "all"}
									/>
									<span className="text-muted-fg text-sm transition-colors group-hover:text-fg">
										{price.label}
									</span>
								</label>
							))}
						</div>
					</div>

					{/* Stock Status */}
					<div>
						<label className="mb-3 block font-semibold text-fg text-sm">
							Availability
						</label>
						<label className="group flex cursor-pointer items-center space-x-3">
							<input
								type="checkbox"
								className="size-4 rounded border-border text-primary focus:ring-2 focus:ring-primary/20"
							/>
							<span className="text-muted-fg text-sm transition-colors group-hover:text-fg">
								In Stock Only
							</span>
						</label>
					</div>

					{/* Clear Filters */}
					<Button intent="outline" size="sm" className="mt-4 w-full">
						Clear All Filters
					</Button>
				</CardContent>
			</Card>
		</div>
	)
}
