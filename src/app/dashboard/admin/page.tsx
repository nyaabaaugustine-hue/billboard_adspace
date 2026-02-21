'use client';

import { StatCards } from "@/components/dashboard/admin/StatCards";
import { SystemHealth } from "@/components/dashboard/admin/SystemHealth";
import { Button } from "@/components/ui/button";
import { Download, Loader2, UserPlus } from "lucide-react";
import { PlatformAnalyticsChart } from "@/components/dashboard/admin/PlatformAnalyticsChart";
import { RecentPlatformActivity } from "@/components/dashboard/admin/RecentPlatformActivity";
import { UserRoleDistribution } from "@/components/dashboard/admin/UserRoleDistribution";
import { UserLocationBreakdown } from "@/components/dashboard/admin/UserLocationBreakdown";
import { Alerts } from "@/components/dashboard/admin/Alerts";
import { TopPerformers } from "@/components/dashboard/admin/TopPerformers";
import { MapOverview } from "@/components/dashboard/admin/MapOverview";
import { useDoc, useFirestore, useUser } from "@/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { doc } from "firebase/firestore";
import type { UserProfile } from "@/lib/types";

export default function AdminDashboardPage() {
  const { user, loading: userLoading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();

  const userProfileRef = useMemo(() => {
    if (!user) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);

  const { data: userProfile, loading: profileLoading } = useDoc<UserProfile>(userProfileRef);

  useEffect(() => {
    if (!userLoading && !user) {
      router.push('/login');
    }
  }, [user, userLoading, router]);

  useEffect(() => {
    if (!profileLoading && userProfile && userProfile.role !== 'ADMIN') {
        router.push('/dashboard/user');
    }
  }, [userProfile, profileLoading, router]);

  const isLoading = userLoading || profileLoading;

  if (isLoading || !userProfile || userProfile.role !== 'ADMIN') {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-background">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome back, Admin. Here is the platform's performance overview.
          </p>
        </div>
        <div className="flex items-center space-x-2">
            <Button variant="outline">
                <UserPlus className="mr-2 h-4 w-4" />
                Invite Vendor
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
        <Alerts className="col-span-12 md:col-span-6 lg:col-span-4" />
        <TopPerformers className="col-span-12 md:col-span-6 lg:col-span-4" />
        <MapOverview className="col-span-12 lg:col-span-4" />
      </div>
      
      <div className="grid grid-cols-12 gap-6">
          <UserRoleDistribution className="col-span-12 lg:col-span-5" />
          <UserLocationBreakdown className="col-span-12 lg:col-span-7" />
      </div>
    </div>
  );
}
