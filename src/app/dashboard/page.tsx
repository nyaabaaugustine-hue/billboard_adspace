import { StatCards } from "@/components/dashboard/StatCards";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { RecentBookingsTable } from "@/components/dashboard/RecentBookingsTable";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Alerts } from "@/components/dashboard/Alerts";
import { MapOverview } from "@/components/dashboard/MapOverview";
import { TopPerformers } from "@/components/dashboard/TopPerformers";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your platform's performance.
          </p>
        </div>
        <div className="flex items-center space-x-2">
            <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
            </Button>
        </div>
      </div>

      <StatCards />

      <div className="grid grid-cols-12 gap-6">
        <RevenueChart className="col-span-12 lg:col-span-7" />
        <TopPerformers className="col-span-12 lg:col-span-5" />
        <RecentBookingsTable className="col-span-12 lg:col-span-8" />
        <div className="col-span-12 space-y-6 lg:col-span-4">
            <MapOverview />
            <Alerts />
        </div>
      </div>
    </div>
  );
}
