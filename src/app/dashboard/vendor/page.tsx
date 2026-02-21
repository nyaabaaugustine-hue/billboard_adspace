
'use client';

import { Button } from "@/components/ui/button";
import { Loader2, PlusCircle } from "lucide-react";
import { VendorStatCards } from "@/components/dashboard/vendor/VendorStatCards";
import { VendorBillboardsTable } from "@/components/dashboard/vendor/VendorBillboardsTable";
import { RevenueChart } from "@/components/dashboard/shared/RevenueChart";
import { useDoc, useFirestore, useUser } from "@/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { doc } from "firebase/firestore";
import type { UserProfile } from "@/lib/types";


export default function VendorDashboardPage() {
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
      if (!profileLoading && userProfile && userProfile.role !== 'VENDOR' && userProfile.role !== 'ADMIN') {
          router.push('/dashboard/user');
      }
  }, [userProfile, profileLoading, router]);

  const isLoading = userLoading || profileLoading;

  if (isLoading || !userProfile || (userProfile.role !== 'VENDOR' && userProfile.role !== 'ADMIN')) {
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
            Vendor Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome, {user?.displayName || 'Vendor'}! Manage your listings and view your performance.
          </p>
        </div>
        <div className="flex items-center space-x-2">
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Billboard
            </Button>
        </div>
      </div>

      <VendorStatCards />

      <div className="grid grid-cols-12 gap-6">
        <RevenueChart className="col-span-12 lg:col-span-7" />
        <VendorBillboardsTable className="col-span-12 lg:col-span-5" />
      </div>
    </div>
  );
}
