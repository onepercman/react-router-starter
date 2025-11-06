import { BarChart3, Lock, Package, Rocket } from "lucide-react"
import { Link } from "react-router"
import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "~/shared/components/ui"

export default function HomePage() {
	const navigationItems = [
		{
			title: "Dashboard",
			description: "Overview and analytics dashboard",
			path: "/dashboard",
			color:
				"bg-gradient-to-br from-secondary to-muted hover:from-muted hover:to-muted border-primary/30 hover:border-primary/50",
			iconBg: "bg-primary",
			textColor: "text-primary",
			icon: <BarChart3 className="size-6" />,
		},
		{
			title: "Products",
			description: "Manage your product catalog",
			path: "/products",
			color:
				"bg-gradient-to-br from-secondary to-muted hover:from-muted hover:to-muted border-chart-1/30 hover:border-chart-1/50",
			iconBg: "bg-chart-1",
			textColor: "text-chart-1",
			icon: <Package className="size-6" />,
		},
		{
			title: "Login",
			description: "User authentication system",
			path: "/auth/login",
			color:
				"bg-gradient-to-br from-secondary to-muted hover:from-muted hover:to-muted border-chart-5/30 hover:border-chart-5/50",
			iconBg: "bg-chart-5",
			textColor: "text-chart-5",
			icon: <Lock className="size-6" />,
		},
	]

	const features = [
		{
			title: "Feature-First Architecture",
			description: "Modern, scalable organization with high cohesion",
			color: "border-l-primary bg-secondary/50",
		},
		{
			title: "React Router v7",
			description: "Latest routing with SSR and modern patterns",
			color: "border-l-chart-2 bg-secondary/50",
		},
		{
			title: "TypeScript",
			description: "Type-safe development with excellent DX",
			color: "border-l-chart-1 bg-secondary/50",
		},
		{
			title: "Tailwind CSS",
			description: "Utility-first styling with design system",
			color: "border-l-chart-5 bg-secondary/50",
		},
		{
			title: "Component Library",
			description: "Reusable UI components and patterns",
			color: "border-l-accent bg-secondary/50",
		},
		{
			title: "Best Practices",
			description: "Industry standards and maintainable code",
			color: "border-l-destructive bg-secondary/50",
		},
	]

	return (
		<div className="container space-y-12 px-4 py-8">
			<div className="rounded-xl bg-gradient-to-b from-secondary/30 to-transparent py-12 text-center">
				<h1 className="mb-3 font-bold text-3xl text-fg md:text-4xl lg:text-5xl">
					React Router v7 Starter
				</h1>
				<p className="mx-auto mb-6 max-w-2xl px-4 text-lg text-muted-fg md:text-xl">
					A modern, scalable foundation for building React applications with
					feature-first architecture
				</p>
				<div className="flex flex-col justify-center gap-3 px-4 sm:flex-row">
					<Button intent="primary" size="lg">
						<Rocket className="size-4" />
						<span>Get Started</span>
					</Button>
					<Link to="/dashboard">
						<Button intent="outline" size="lg">
							<span>Documentation</span>
						</Button>
					</Link>
				</div>
			</div>

			<Card className="border-2 border-primary/30 bg-gradient-to-r from-secondary to-accent">
				<CardHeader>
					<CardTitle className="text-primary text-xl">
						Project Overview
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
						<div className="rounded-lg border border-chart-2/30 bg-muted p-4 text-center">
							<div className="mb-1 font-bold text-2xl text-chart-2 md:text-3xl">
								3
							</div>
							<div className="font-medium text-chart-2/70 text-xs md:text-sm">
								Modules
							</div>
						</div>
						<div className="rounded-lg border border-chart-1/30 bg-muted p-4 text-center">
							<div className="mb-1 font-bold text-2xl text-chart-1 md:text-3xl">
								15+
							</div>
							<div className="font-medium text-chart-1/70 text-xs md:text-sm">
								Components
							</div>
						</div>
						<div className="rounded-lg border border-chart-5/30 bg-muted p-4 text-center">
							<div className="mb-1 font-bold text-2xl text-chart-5 md:text-3xl">
								100%
							</div>
							<div className="font-medium text-chart-5/70 text-xs md:text-sm">
								TypeScript
							</div>
						</div>
						<div className="rounded-lg border border-chart-5/30 bg-muted p-4 text-center">
							<div className="mb-1 font-bold text-2xl text-chart-5 md:text-3xl">
								SSR
							</div>
							<div className="font-medium text-chart-5/70 text-xs md:text-sm">
								Ready
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
				{navigationItems.map((item) => (
					<Link key={item.path} to={item.path} className="group">
						<Card
							className={`h-full cursor-pointer border-2 transition-all duration-300 ${item.color}`}
						>
							<CardContent className="p-4 md:p-6">
								<div className="flex items-start space-x-3">
									<div
										className={`${item.iconBg} flex-shrink-0 rounded-lg p-2 text-lg text-primary-fg md:p-3 md:text-xl`}
									>
										{item.icon}
									</div>
									<div className="min-w-0 flex-1">
										<h3
											className={`font-semibold text-base md:text-lg ${item.textColor} mb-2`}
										>
											{item.title}
										</h3>
										<p className="mb-3 text-muted-fg text-sm leading-relaxed">
											{item.description}
										</p>
										<Button size="sm" intent="outline">
											Explore →
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>
					</Link>
				))}
			</div>

			<Card>
				<CardHeader>
					<CardTitle className="text-xl">🌟 Key Features</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
						{features.map((feature, index) => (
							<div
								key={index}
								className={`rounded-lg border-l-4 p-4 md:p-6 ${feature.color} transition-all duration-200 hover:shadow-md`}
							>
								<h3 className="mb-2 font-semibold text-base text-fg md:text-lg">
									{feature.title}
								</h3>
								<p className="text-muted-fg text-sm leading-relaxed">
									{feature.description}
								</p>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle className="text-xl">Getting Started</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-6">
						<div className="flex items-start space-x-4">
							<div className="flex size-8 flex-shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-fg text-sm">
								1
							</div>
							<div className="flex-1">
								<h4 className="mb-2 font-semibold text-fg">
									Explore the Dashboard
								</h4>
								<p className="mb-3 text-muted-fg text-sm leading-relaxed">
									Check out the analytics and overview functionality with sample
									data and charts.
								</p>
								<Button size="sm" intent="outline">
									View Dashboard →
								</Button>
							</div>
						</div>

						<div className="flex items-start space-x-4">
							<div className="flex size-8 flex-shrink-0 items-center justify-center rounded-full bg-chart-1 font-bold text-primary-fg text-sm">
								2
							</div>
							<div className="flex-1">
								<h4 className="mb-2 font-semibold text-fg">Browse Products</h4>
								<p className="mb-3 text-muted-fg text-sm leading-relaxed">
									See the product catalog with filtering, categories, and modern
									card layouts.
								</p>
								<Button size="sm" intent="outline">
									Browse Products →
								</Button>
							</div>
						</div>

						<div className="flex items-start space-x-4">
							<div className="flex size-8 flex-shrink-0 items-center justify-center rounded-full bg-chart-5 font-bold text-primary-fg text-sm">
								3
							</div>
							<div className="flex-1">
								<h4 className="mb-2 font-semibold text-fg">
									Try Authentication
								</h4>
								<p className="mb-3 text-muted-fg text-sm leading-relaxed">
									Experience the login flow with form validation and loading
									states.
								</p>
								<Button size="sm" intent="outline">
									Try Login →
								</Button>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
