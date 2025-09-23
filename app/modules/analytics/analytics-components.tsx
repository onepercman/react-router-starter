import {
  IconArrowUp,
  IconChartBar,
  IconCurrencyDollar,
  IconEye,
  IconPackage,
  IconPeople,
  IconSettings,
} from "@intentui/icons"
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/shared/components/ui"
import type { ActivityItem, StatItem } from "./analytics-types"

interface StatsGridProps {
  stats: StatItem[]
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-fg">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-fg">{stat.value}</p>
                <p
                  className={`text-sm font-semibold ${
                    stat.changeType === "positive"
                      ? "text-success"
                      : "text-danger"
                  }`}
                >
                  {stat.change} from last month
                </p>
              </div>
              <div className="text-2xl">
                {index === 0 && (
                  <IconCurrencyDollar className="size-6 text-success" />
                )}
                {index === 1 && <IconPeople className="size-6 text-info" />}
                {index === 2 && <IconArrowUp className="size-6 text-primary" />}
                {index === 3 && <IconEye className="size-6 text-accent" />}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export function AnalyticsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] bg-bg rounded-lg flex items-center justify-center">
          <div className="text-center">
            <IconChartBar className="size-12 text-muted-fg mx-auto mb-4" />
            <p className="text-lg font-medium text-fg">Chart Placeholder</p>
            <p className="text-sm text-muted-fg">
              Analytics chart would go here
            </p>
          </div>
        </div>
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
              className="flex items-center justify-between py-2 border-b border-border last:border-b-0"
            >
              <div>
                <p className="text-sm font-medium text-fg">{activity.action}</p>
                <p className="text-xs text-muted-fg">by {activity.user}</p>
              </div>
              <span className="text-xs text-muted-fg">{activity.time}</span>
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 gap-y-6">
          <Button intent="outline" className="h-20 flex-col gap-2">
            <IconPackage className="size-6" />
            <span>Add Product</span>
          </Button>
          <Button intent="outline" className="h-20 flex-col gap-2">
            <IconPeople className="size-6" />
            <span>Manage Users</span>
          </Button>
          <Button intent="outline" className="h-20 flex-col gap-2">
            <IconChartBar className="size-6" />
            <span>View Analytics</span>
          </Button>
          <Button intent="outline" className="h-20 flex-col gap-2">
            <IconSettings className="size-6" />
            <span>Settings</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
