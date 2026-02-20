import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { UserStatCards } from "@/components/user-dashboard/UserStatCards";
import { ActiveCampaigns } from "@/components/user-dashboard/ActiveCampaigns";
import { RecentBookingsTable } from "@/components/dashboard/RecentBookingsTable";

export default function UserDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">
            My Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome, Olivia! Here's an overview of your advertising campaigns.
          </p>
        </div>
        <div className="flex items-center space-x-2">
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Start New Campaign
            </Button>
        </div>
      </div>

      <UserStatCards />
      
      <div className="grid grid-cols-12 gap-6">
        <ActiveCampaigns className="col-span-12 lg:col-span-7" />
        <RecentBookingsTable className="col-span-12 lg:col-span-5" />
      </div>

    </div>
  );
}
