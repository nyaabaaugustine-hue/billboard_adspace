'use client';

import { Button } from "@/components/ui/button";
import { Loader2, PlusCircle } from "lucide-react";
import { UserStatCards } from "@/components/dashboard/user/UserStatCards";
import { useUser, useFirestore, useCollection } from "@/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import Link from "next/link";
import { collection, query, where } from "firebase/firestore";
import type { FirestoreBooking } from "@/lib/types";
import { UserBookingsTable } from "@/components/dashboard/user/UserBookingsTable";

export default function UserDashboardPage() {
  const { user, loading: userLoading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();

  const userBookingsQuery = useMemo(() => {
    if (!user) return null;
    return query(collection(firestore, 'bookings'), where('userId', '==', user.uid));
  }, [firestore, user]);

  const { data: bookings, loading: bookingsLoading } = useCollection<FirestoreBooking>(userBookingsQuery);

  useEffect(() => {
    if (!userLoading && !user) {
        router.push('/login');
    }
  }, [user, userLoading, router]);

  const isLoading = userLoading || !user;

  if (isLoading) {
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
            <Button asChild>
                <Link href="/dashboard/user/new-campaign">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Start New Campaign
                </Link>
            </Button>
        </div>
      </div>

      <UserStatCards bookings={bookings || []} loading={bookingsLoading} />
      
      <UserBookingsTable bookings={bookings || []} loading={bookingsLoading} />

    </div>
  );
}
