import { StatCards } from "@/components/dashboard/admin/StatCards";
import { SystemHealth } from "@/components/dashboard/admin/SystemHealth";
import { Button } from "@/components/ui/button";
import { Download, UserPlus } from "lucide-react";
import { PlatformAnalyticsChart } from "@/components/dashboard/admin/PlatformAnalyticsChart";
import { RecentPlatformActivity } from "@/components/dashboard/admin/RecentPlatformActivity";
import { JobMarketInsights } from "@/components/dashboard/admin/JobMarketInsights";
import { UserRoleDistribution } from "@/components/dashboard/admin/UserRoleDistribution";
import { ModerationCenter } from "@/components/dashboard/admin/ModerationCenter";
import { JobsExpiringSoon } from "@/components/dashboard/admin/JobsExpiringSoon";
import { UserLocationBreakdown } from "@/components/dashboard/admin/UserLocationBreakdown";

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
        <PlatformAnalyticsChart className="col-span-12 lg:col-span-7" />
        <RecentPlatformActivity className="col-span-12 lg:col-span-5" />
      </div>

      <div className="grid grid-cols-12 gap-6">
        <JobMarketInsights className="col-span-12 lg:col-span-7" />
        <UserRoleDistribution className="col-span-12 lg:col-span-5" />
      </div>

      <div className="grid grid-cols-12 gap-6">
          <ModerationCenter className="col-span-12 md:col-span-6 lg:col-span-4" />
          <JobsExpiringSoon className="col-span-12 md:col-span-6 lg:col-span-4" />
          <UserLocationBreakdown className="col-span-12 lg:col-span-4" />
      </div>
    </div>
  );
}
