import { IconChartBar } from "@intentui/icons"
import type { ActivityItem, StatItem } from "~/modules/analytics"
import {
  ActivityFeed,
  AnalyticsChart,
  QuickActions,
  StatsGrid,
} from "~/modules/analytics"
import { PageHeader } from "~/shared/components/page-header"
import { Button } from "~/shared/components/ui"

export default function DashboardPage() {
  const stats: StatItem[] = [
    {
      label: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      changeType: "positive",
    },
    {
      label: "Subscriptions",
      value: "+2,350",
      change: "+180.1%",
      changeType: "positive",
    },
    {
      label: "Sales",
      value: "+12,234",
      change: "+19%",
      changeType: "positive",
    },
    {
      label: "Active Now",
      value: "+573",
      change: "+201",
      changeType: "positive",
    },
  ]

  const recentActivities: ActivityItem[] = [
    {
      id: 1,
      action: "New order received",
      user: "John Doe",
      time: "2 minutes ago",
    },
    {
      id: 2,
      action: "Payment processed",
      user: "Jane Smith",
      time: "5 minutes ago",
    },
    {
      id: 3,
      action: "Product updated",
      user: "Mike Johnson",
      time: "10 minutes ago",
    },
    {
      id: 4,
      action: "User registered",
      user: "Sarah Wilson",
      time: "15 minutes ago",
    },
  ]

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's what's happening with your store today."
      >
        <div className="flex space-x-2">
          <Button intent="primary">
            <IconChartBar className="size-4" />
            View Reports
          </Button>
        </div>
      </PageHeader>

      <StatsGrid stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AnalyticsChart />
        </div>
        <div>
          <ActivityFeed activities={recentActivities} />
        </div>
      </div>

      <div className="mt-8">
        <QuickActions />
      </div>
    </div>
  )
}
