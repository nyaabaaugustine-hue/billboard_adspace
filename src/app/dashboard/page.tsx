import { StatCards } from "@/components/dashboard/StatCards";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your platform's performance.
        </p>
      </div>

      <StatCards />

      {/* Placeholder for future charts and tables */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="h-96 rounded-lg border bg-card p-4">
          <h3 className="font-semibold">Revenue Over Time</h3>
          <div className="flex h-full items-center justify-center text-muted-foreground">
            Chart coming soon
          </div>
        </div>
        <div className="h-96 rounded-lg border bg-card p-4">
          <h3 className="font-semibold">Recent Bookings</h3>
          <div className="flex h-full items-center justify-center text-muted-foreground">
            Table coming soon
          </div>
        </div>
      </div>
    </div>
  );
}
