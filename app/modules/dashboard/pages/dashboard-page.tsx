import {
  PageHeader,
  UiButton,
  UiCard,
  UiCardContent,
  UiCardHeader,
  UiCardTitle,
} from "~/shared/components";

export function DashboardPage() {
  const stats = [
    {
      label: "Total Users",
      value: "1,234",
      change: "+12%",
      changeType: "positive",
    },
    {
      label: "Total Products",
      value: "567",
      change: "+8%",
      changeType: "positive",
    },
    {
      label: "Total Orders",
      value: "890",
      change: "-3%",
      changeType: "negative",
    },
    {
      label: "Revenue",
      value: "$12,345",
      change: "+15%",
      changeType: "positive",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      action: "New user registered",
      user: "John Doe",
      time: "2 minutes ago",
    },
    {
      id: 2,
      action: "Product updated",
      user: "Jane Smith",
      time: "5 minutes ago",
    },
    {
      id: 3,
      action: "Order completed",
      user: "Bob Johnson",
      time: "10 minutes ago",
    },
    {
      id: 4,
      action: "Payment received",
      user: "Alice Brown",
      time: "15 minutes ago",
    },
  ];

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Overview of your application metrics and recent activities"
      >
        <UiButton>📊 View Reports</UiButton>
      </PageHeader>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <UiCard key={index} shadow="sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div
                className={`text-sm font-semibold ${
                  stat.changeType === "positive"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {stat.change}
              </div>
            </div>
          </UiCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <UiCard>
          <UiCardHeader>
            <UiCardTitle>Recent Activities</UiCardTitle>
          </UiCardHeader>
          <UiCardContent>
            <div className="space-y-4">
              {recentActivities.map(activity => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {activity.action}
                    </p>
                    <p className="text-xs text-gray-600">by {activity.user}</p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </UiCardContent>
        </UiCard>

        {/* Quick Actions */}
        <UiCard>
          <UiCardHeader>
            <UiCardTitle>Quick Actions</UiCardTitle>
          </UiCardHeader>
          <UiCardContent>
            <div className="grid grid-cols-2 gap-4">
              <UiButton variant="outline" className="h-20 flex-col">
                <span className="text-lg mb-1">👥</span>
                <span className="text-xs">Add User</span>
              </UiButton>
              <UiButton variant="outline" className="h-20 flex-col">
                <span className="text-lg mb-1">📦</span>
                <span className="text-xs">Add Product</span>
              </UiButton>
              <UiButton variant="outline" className="h-20 flex-col">
                <span className="text-lg mb-1">📊</span>
                <span className="text-xs">View Analytics</span>
              </UiButton>
              <UiButton variant="outline" className="h-20 flex-col">
                <span className="text-lg mb-1">⚙️</span>
                <span className="text-xs">Settings</span>
              </UiButton>
            </div>
          </UiCardContent>
        </UiCard>
      </div>
    </div>
  );
}
