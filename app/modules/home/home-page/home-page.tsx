import { Link } from "react-router";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/shared/components";

export default function HomePage() {
  const navigationItems = [
    {
      title: "📊 Dashboard",
      description: "Overview and analytics dashboard",
      path: "/dashboard",
      color:
        "bg-gradient-to-br from-info-subtle to-info-muted hover:from-info-muted hover:to-info-muted border-info/30 hover:border-info/50",
      iconBg: "bg-info",
      textColor: "text-info",
      icon: "📊",
    },
    {
      title: "📦 Products",
      description: "Manage your product catalog",
      path: "/products",
      color:
        "bg-gradient-to-br from-success-subtle to-success-muted hover:from-success-muted hover:to-success-muted border-success/30 hover:border-success/50",
      iconBg: "bg-success",
      textColor: "text-success",
      icon: "📦",
    },
    {
      title: "🔐 Login",
      description: "User authentication system",
      path: "/auth/login",
      color:
        "bg-gradient-to-br from-warning-subtle to-warning-muted hover:from-warning-muted hover:to-warning-muted border-warning/30 hover:border-warning/50",
      iconBg: "bg-warning",
      textColor: "text-warning",
      icon: "🔐",
    },
  ];

  const features = [
    {
      title: "🏗️ Feature-First Architecture",
      description: "Modern, scalable organization with high cohesion",
      color: "border-l-primary bg-primary-subtle/50",
    },
    {
      title: "🚀 React Router v7",
      description: "Latest routing with SSR and modern patterns",
      color: "border-l-info bg-info-subtle/50",
    },
    {
      title: "⚡ TypeScript",
      description: "Type-safe development with excellent DX",
      color: "border-l-success bg-success-subtle/50",
    },
    {
      title: "🎨 Tailwind CSS",
      description: "Utility-first styling with design system",
      color: "border-l-warning bg-warning-subtle/50",
    },
    {
      title: "🧩 Component Library",
      description: "Reusable UI components and patterns",
      color: "border-l-accent bg-accent-subtle/50",
    },
    {
      title: "📝 Best Practices",
      description: "Industry standards and maintainable code",
      color: "border-l-error bg-error-subtle/50",
    },
  ];

  return (
    <div className="space-y-12">
      <div className="text-center py-12 bg-gradient-to-b from-primary-subtle/30 to-transparent rounded-xl">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
          React Router v7 Starter
        </h1>
        <p className="text-lg md:text-xl text-secondary mb-6 max-w-2xl mx-auto px-4">
          A modern, scalable foundation for building React applications with
          feature-first architecture
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center px-4">
          <Button color="primary" size="lg">
            <span>🚀</span> <span>Get Started</span>
          </Button>
          <Link to="/dashboard">
            <Button variant="outlined" size="lg">
              <span>📖</span> <span>Documentation</span>
            </Button>
          </Link>
        </div>
      </div>

      <Card className="border-2 border-primary/30 bg-gradient-to-r from-primary-subtle to-accent-subtle">
        <CardHeader>
          <CardTitle className="text-primary text-xl">
            🎯 Project Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-card rounded-lg border border-info/30">
              <div className="text-2xl md:text-3xl font-bold text-info mb-1">
                3
              </div>
              <div className="text-xs md:text-sm text-info/70 font-medium">
                Modules
              </div>
            </div>
            <div className="text-center p-4 bg-card rounded-lg border border-success/30">
              <div className="text-2xl md:text-3xl font-bold text-success mb-1">
                15+
              </div>
              <div className="text-xs md:text-sm text-success/70 font-medium">
                Components
              </div>
            </div>
            <div className="text-center p-4 bg-card rounded-lg border border-warning/30">
              <div className="text-2xl md:text-3xl font-bold text-warning mb-1">
                100%
              </div>
              <div className="text-xs md:text-sm text-warning/70 font-medium">
                TypeScript
              </div>
            </div>
            <div className="text-center p-4 bg-card rounded-lg border border-accent/30">
              <div className="text-2xl md:text-3xl font-bold text-accent mb-1">
                SSR
              </div>
              <div className="text-xs md:text-sm text-accent/70 font-medium">
                Ready
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {navigationItems.map(item => (
          <Link key={item.path} to={item.path} className="group">
            <Card
              className={`transition-all duration-300 border-2 cursor-pointer h-full ${item.color}`}
            >
              <CardContent className="p-4 md:p-6">
                <div className="flex items-start space-x-3">
                  <div
                    className={`${item.iconBg} p-2 md:p-3 rounded-lg text-white text-lg md:text-xl flex-shrink-0`}
                  >
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`text-base md:text-lg font-semibold ${item.textColor} mb-2`}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm text-secondary mb-3 leading-relaxed">
                      {item.description}
                    </p>
                    <Button size="sm" variant="outlined">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-4 md:p-6 rounded-lg border-l-4 ${feature.color} transition-all duration-200 hover:shadow-md`}
              >
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-secondary text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">🚀 Getting Started</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                1
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-2">
                  Explore the Dashboard
                </h4>
                <p className="text-secondary text-sm mb-3 leading-relaxed">
                  Check out the analytics and overview functionality with sample
                  data and charts.
                </p>
                <Button size="sm" variant="outlined">
                  View Dashboard →
                </Button>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-success text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                2
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-2">
                  Browse Products
                </h4>
                <p className="text-secondary text-sm mb-3 leading-relaxed">
                  See the product catalog with filtering, categories, and modern
                  card layouts.
                </p>
                <Button size="sm" variant="outlined">
                  Browse Products →
                </Button>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-warning text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                3
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-2">
                  Try Authentication
                </h4>
                <p className="text-secondary text-sm mb-3 leading-relaxed">
                  Experience the login flow with form validation and loading
                  states.
                </p>
                <Button size="sm" variant="outlined">
                  Try Login →
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
