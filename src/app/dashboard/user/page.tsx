
'use client';

import { Button } from "@/components/ui/button";
import { Loader2, PlusCircle } from "lucide-react";
import { UserStatCards } from "@/components/dashboard/user/UserStatCards";
import { ActiveCampaigns } from "@/components/dashboard/user/ActiveCampaigns";
import { RecentBookingsTable } from "@/components/dashboard/shared/RecentBookingsTable";
import { useUser } from "@/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserDashboardPage() {
  const { user, loading: userLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!userLoading && !user) {
        router.push('/login');
    }
  }, [user, userLoading, router]);

  if (userLoading || !user) {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-background">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">
            My Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome, {user.displayName || 'User'}! Here&apos;s an overview of your advertising campaigns.
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
