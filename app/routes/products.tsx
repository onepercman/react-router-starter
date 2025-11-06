import { BarChart3 } from "lucide-react"
import { useState } from "react"
import type { Product } from "~/modules/products"
import { ProductFilters, ProductGrid } from "~/modules/products"
import { PageHeader } from "~/shared/components/page-header"
import { Button, Select } from "~/shared/components/ui"

export default function ProductsPage() {
	const [selectedSort, setSelectedSort] = useState("newest")

	const sortOptions = [
		{ id: "newest", label: "Newest" },
		{ id: "price-low", label: "Price: Low to High" },
		{ id: "price-high", label: "Price: High to Low" },
		{ id: "name-az", label: "Name A-Z" },
	]

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

	return (
		<div className="container space-y-8 px-4 py-8">
			<PageHeader
				title="Products"
				description="Discover our curated collection of premium products"
			>
				<div className="flex flex-col gap-3 sm:flex-row">
					<Button intent="primary" className="shadow-lg">
						<span>➕</span>
						<span>Add Product</span>
					</Button>
					<Button intent="outline" className="shadow-sm">
						<BarChart3 className="size-4" />
						<span>Export</span>
					</Button>
				</div>
			</PageHeader>

			{/* Stats Row */}
			<div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
				<div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary-subtle to-primary-muted p-4">
					<div className="font-bold text-2xl text-primary">
						{products.length}
					</div>
					<div className="text-primary/70 text-sm">Total Products</div>
				</div>
				<div className="rounded-xl border border-success/20 bg-gradient-to-br from-success-subtle to-success-muted p-4">
					<div className="font-bold text-2xl text-success">
						{products.filter((p) => p.inStock).length}
					</div>
					<div className="text-sm text-success/70">In Stock</div>
				</div>
				<div className="rounded-xl border border-info/20 bg-gradient-to-br from-info-subtle to-info-muted p-4">
					<div className="font-bold text-2xl text-info">
						{new Set(products.map((p) => p.category)).size}
					</div>
					<div className="text-info/70 text-sm">Categories</div>
				</div>
				<div className="rounded-xl border border-accent/20 bg-gradient-to-br from-info-subtle to-accent-muted p-4">
					<div className="font-bold text-2xl text-info">
						$
						{Math.round(
							products.reduce((sum, p) => sum + p.price, 0) / products.length,
						)}
					</div>
					<div className="text-info text-sm">Avg Price</div>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
				<div className="space-y-6 lg:col-span-1">
					<ProductFilters />
				</div>

				<div className="lg:col-span-4">
					<div className="mb-6 flex items-center justify-between">
						<div className="flex items-center gap-3">
							<h2 className="font-semibold text-fg text-xl">All Products</h2>
							<span className="rounded-full bg-muted px-3 py-1 text-muted-fg text-sm">
								{products.length} items
							</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="whitespace-nowrap text-muted-fg text-sm">
								Sort by:
							</span>
							<Select
								selectedKey={selectedSort}
								onSelectionChange={(key) => setSelectedSort(key as string)}
								className="min-w-48"
							>
								<Select.Trigger />
								<Select.Content>
									{sortOptions.map((option) => (
										<Select.Item key={option.id} id={option.id}>
											{option.label}
										</Select.Item>
									))}
								</Select.Content>
							</Select>
						</div>
					</div>
					<ProductGrid products={products} />
				</div>
			</div>
		</div>
	)
}
