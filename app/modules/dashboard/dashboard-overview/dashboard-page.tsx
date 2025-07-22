import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  PageHeader,
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
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
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
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
                      <p className="text-xs text-secondary">
                        by {activity.user}
                      </p>
                    </div>
                    <span className="text-xs text-secondary">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-8">
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
      </div>
    </div>
  );
}
