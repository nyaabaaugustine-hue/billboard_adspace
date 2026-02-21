
'use client';

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { VendorStatCards } from "@/components/dashboard/vendor/VendorStatCards";
import { VendorBillboardsTable } from "@/components/dashboard/vendor/VendorBillboardsTable";
import { RevenueChart } from "@/components/dashboard/shared/RevenueChart";
import { RecentBookingsTable } from "@/components/dashboard/shared/RecentBookingsTable";
import { useDoc, useFirestore, useUser, useCollection } from "@/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { collection, doc, query, where } from "firebase/firestore";
import type { UserProfile, Billboard, FirestoreBooking } from "@/lib/types";
import { AddBillboardDialog } from "@/components/dashboard/vendor/AddBillboardDialog";


export default function VendorDashboardPage() {
  const { user, loading: userLoading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();

  const userProfileRef = useMemo(() => {
      if (!user) return null;
      return doc(firestore, 'users', user.uid);
  }, [firestore, user]);

  const { data: userProfile, loading: profileLoading } = useDoc<UserProfile>(userProfileRef);
  
  // 1. Get vendor's billboards
  const vendorBillboardsQuery = useMemo(() => {
    if (!user) return null;
    return query(collection(firestore, 'billboards'), where('vendorId', '==', user.uid));
  }, [firestore, user]);
  const { data: vendorBillboards, loading: billboardsLoading } = useCollection<Billboard>(vendorBillboardsQuery);

  // 2. Get IDs of the billboards
  const billboardIds = useMemo(() => {
      if (!vendorBillboards) return [];
      return vendorBillboards.map(b => b.id);
  }, [vendorBillboards]);

  // 3. Get bookings for those billboards
  const bookingsQuery = useMemo(() => {
      if (!billboardIds || billboardIds.length === 0) return null;
      // Firestore 'in' queries are limited to 30 items in a snapshot listener.
      // For more, a different strategy (e.g., backend function or multiple queries) would be needed.
      if (billboardIds.length > 30) {
        console.warn("Querying bookings for more than 30 billboards, this may not work as expected with Firestore snapshots.");
      }
      return query(collection(firestore, 'bookings'), where('billboardId', 'in', billboardIds));
  }, [firestore, billboardIds]);
  const { data: vendorBookings, loading: bookingsLoading } = useCollection<FirestoreBooking>(bookingsQuery);


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
  const isDataLoading = billboardsLoading || bookingsLoading;

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
            <AddBillboardDialog />
        </div>
      </div>

      <VendorStatCards 
        billboards={vendorBillboards || []} 
        bookings={vendorBookings || []} 
        loading={isDataLoading}
      />

      <div className="grid grid-cols-12 gap-6">
        <RevenueChart 
          className="col-span-12 lg:col-span-7"
          bookings={vendorBookings || []}
          loading={isDataLoading}
        />
        <RecentBookingsTable 
          className="col-span-12 lg:col-span-5" 
          bookings={vendorBookings || []}
          loading={isDataLoading}
        />
      </div>

      <VendorBillboardsTable />
    </div>
  );
}
