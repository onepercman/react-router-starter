import {
	ArrowUp,
	BarChart3,
	DollarSign,
	Eye,
	Package,
	Settings,
	Users,
} from "lucide-react"
import {
	AreaChart,
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	type ChartConfig,
} from "~/shared/components/ui"
import type { ActivityItem, StatItem } from "./analytics-types"

interface StatsGridProps {
	stats: StatItem[]
}

export function StatsGrid({ stats }: StatsGridProps) {
	return (
		<div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
			{stats.map((stat, index) => (
				<Card key={index}>
					<CardContent className="p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium text-muted-fg text-sm">
									{stat.label}
								</p>
								<p className="font-bold text-2xl text-fg">{stat.value}</p>
								<p
									className={`font-semibold text-sm ${
										stat.changeType === "positive"
											? "text-success"
											: "text-danger"
									}`}
								>
									{stat.change} from last month
								</p>
							</div>
							<div className="text-2xl">
								{index === 0 && <DollarSign className="size-6 text-success" />}
								{index === 1 && <Users className="size-6 text-info" />}
								{index === 2 && <ArrowUp className="size-6 text-primary" />}
								{index === 3 && <Eye className="size-6 text-accent" />}
							</div>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	)
}

const chartData = [
	{ month: "January", revenue: 4200, expenses: 2400, profit: 1800 },
	{ month: "February", revenue: 3800, expenses: 2200, profit: 1600 },
	{ month: "March", revenue: 5100, expenses: 2800, profit: 2300 },
	{ month: "April", revenue: 4600, expenses: 2600, profit: 2000 },
	{ month: "May", revenue: 5400, expenses: 3000, profit: 2400 },
	{ month: "June", revenue: 6200, expenses: 3400, profit: 2800 },
]

const chartConfig = {
	revenue: {
		label: "Revenue",
		color: "chart-1",
	},
	expenses: {
		label: "Expenses",
		color: "chart-2",
	},
	profit: {
		label: "Profit",
		color: "chart-3",
	},
} satisfies ChartConfig

export function AnalyticsChart() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Analytics Overview</CardTitle>
			</CardHeader>
			<CardContent>
				<AreaChart
					config={chartConfig}
					data={chartData}
					dataKey="month"
					className="h-[400px]"
				/>
			</CardContent>
		</Card>
	)
}

interface ActivityFeedProps {
	activities: ActivityItem[]
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Recent Activity</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{activities.map((activity) => (
						<div
							key={activity.id}
							className="flex items-center justify-between border-border border-b py-2 last:border-b-0"
						>
							<div>
								<p className="font-medium text-fg text-sm">{activity.action}</p>
								<p className="text-muted-fg text-xs">by {activity.user}</p>
							</div>
							<span className="text-muted-fg text-xs">{activity.time}</span>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	)
}

export function QuickActions() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Quick Actions</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-2 gap-4 gap-y-6 md:grid-cols-4">
					<Button intent="outline" className="h-20 flex-col gap-2">
						<Package className="size-6" />
						<span>Add Product</span>
					</Button>
					<Button intent="outline" className="h-20 flex-col gap-2">
						<Users className="size-6" />
						<span>Manage Users</span>
					</Button>
					<Button intent="outline" className="h-20 flex-col gap-2">
						<BarChart3 className="size-6" />
						<span>View Analytics</span>
					</Button>
					<Button intent="outline" className="h-20 flex-col gap-2">
						<Settings className="size-6" />
						<span>Settings</span>
					</Button>
				</div>
			</CardContent>
		</Card>
	)
}
