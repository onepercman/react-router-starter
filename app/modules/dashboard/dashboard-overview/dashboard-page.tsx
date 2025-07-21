import {
  Button,
  PageHeader,
  UiCard,
  UiCardContent,
  UiCardHeader,
  UiCardTitle,
} from "~/shared/components";

export default function DashboardPage() {
  const stats = [
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
  ];

  const recentActivities = [
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
  ];

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's what's happening with your store today."
      >
        <div className="flex space-x-2">
          <Button color="primary">📊 View Reports</Button>
        </div>
      </PageHeader>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <UiCard key={index}>
            <UiCardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted">{stat.label}</p>
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
            </UiCardContent>
          </UiCard>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-2">
          <UiCard>
            <UiCardHeader>
              <UiCardTitle>Analytics Overview</UiCardTitle>
            </UiCardHeader>
            <UiCardContent>
              <div className="h-[400px] bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-4">📊</div>
                  <p className="text-lg font-medium text-foreground">
                    Chart Placeholder
                  </p>
                  <p className="text-sm text-muted">
                    Analytics chart would go here
                  </p>
                </div>
              </div>
            </UiCardContent>
          </UiCard>
        </div>

        {/* Recent Activity */}
        <div>
          <UiCard>
            <UiCardHeader>
              <UiCardTitle>Recent Activity</UiCardTitle>
            </UiCardHeader>
            <UiCardContent>
              <div className="space-y-4">
                {recentActivities.map(activity => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between py-2 border-b border-border last:border-b-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {activity.action}
                      </p>
                      <p className="text-xs text-muted">by {activity.user}</p>
                    </div>
                    <span className="text-xs text-muted">{activity.time}</span>
                  </div>
                ))}
              </div>
            </UiCardContent>
          </UiCard>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <UiCard>
          <UiCardHeader>
            <UiCardTitle>Quick Actions</UiCardTitle>
          </UiCardHeader>
          <UiCardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outlined" className="h-20 flex-col">
                <span className="text-2xl mb-2">📦</span>
                Add Product
              </Button>
              <Button variant="outlined" className="h-20 flex-col">
                <span className="text-2xl mb-2">👥</span>
                Manage Users
              </Button>
              <Button variant="outlined" className="h-20 flex-col">
                <span className="text-2xl mb-2">📊</span>
                View Analytics
              </Button>
              <Button variant="outlined" className="h-20 flex-col">
                <span className="text-2xl mb-2">⚙️</span>
                Settings
              </Button>
            </div>
          </UiCardContent>
        </UiCard>
      </div>
    </div>
  );
}
