import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/shared/components";
import type { ActivityItem, StatItem } from "./analytics-types";

interface StatsGridProps {
  stats: StatItem[];
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p
                  className={`text-sm font-semibold ${
                    stat.changeType === "positive"
                      ? "text-success"
                      : "text-error"
                  }`}
                >
                  {stat.change} from last month
                </p>
              </div>
              <div className="text-2xl">
                {index === 0 && "💰"}
                {index === 1 && "👥"}
                {index === 2 && "📈"}
                {index === 3 && "👁️"}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function AnalyticsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] bg-background rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-4">📊</div>
            <p className="text-lg font-medium text-foreground">
              Chart Placeholder
            </p>
            <p className="text-sm text-secondary">
              Analytics chart would go here
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface ActivityFeedProps {
  activities: ActivityItem[];
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
                <p className="text-sm font-medium text-foreground">
                  {activity.action}
                </p>
                <p className="text-xs text-secondary">by {activity.user}</p>
              </div>
              <span className="text-xs text-secondary">{activity.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 gap-y-6">
          <Button variant="outlined" className="h-20 flex-col gap-2">
            <span className="text-2xl">📦</span>
            <span>Add Product</span>
          </Button>
          <Button variant="outlined" className="h-20 flex-col gap-2">
            <span className="text-2xl">👥</span>
            <span>Manage Users</span>
          </Button>
          <Button variant="outlined" className="h-20 flex-col gap-2">
            <span className="text-2xl">📊</span>
            <span>View Analytics</span>
          </Button>
          <Button variant="outlined" className="h-20 flex-col gap-2">
            <span className="text-2xl">⚙️</span>
            <span>Settings</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
