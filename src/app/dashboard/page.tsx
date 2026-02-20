import { StatCards } from "@/components/dashboard/StatCards";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { RecentBookingsTable } from "@/components/dashboard/RecentBookingsTable";

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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
            <RevenueChart />
        </div>
        <div className="lg:col-span-2">
            <RecentBookingsTable />
        </div>
      </div>
    </div>
  );
}
