import { StatCards } from "@/components/dashboard/admin/StatCards";
import { RevenueChart } from "@/components/dashboard/shared/RevenueChart";
import { RecentBookingsTable } from "@/components/dashboard/shared/RecentBookingsTable";
import { Button } from "@/components/ui/button";
import { Download, UserPlus } from "lucide-react";
import { SystemHealth } from "@/components/dashboard/admin/SystemHealth";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">
            Executive Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome back, Admin. Here is the platform&apos;s performance overview.
          </p>
        </div>
        <div className="flex items-center space-x-2">
            <Button variant="outline">
                <UserPlus className="mr-2 h-4 w-4" />
                Invite Employer
            </Button>
            <Button>
                <Download className="mr-2 h-4 w-4" />
                Export Reports
            </Button>
        </div>
      </div>

      <StatCards />

      <SystemHealth />

      <div className="grid grid-cols-12 gap-6">
        <RevenueChart className="col-span-12 lg:col-span-7" />
        <RecentBookingsTable className="col-span-12 lg:col-span-5" />
      </div>
    </div>
  );
}
