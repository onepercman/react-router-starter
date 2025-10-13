import { Outlet } from "react-router"

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-subtle/10 via-background to-accent-subtle/10 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 size-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 size-80 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-lg">
        <Outlet />
      </div>
    </div>
  )
}
