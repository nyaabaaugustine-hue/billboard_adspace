'use client';

import { useMemo, useEffect } from 'react';
import { useCollection, useDoc, useFirestore, useUser } from '@/firebase';
import { collection, doc, query, where, type DocumentData } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import type { UserProfile, Billboard } from '@/lib/types';


interface Booking extends DocumentData {
  id: string;
  billboardTitle: string;
  startDate: { toDate: () => Date };
  endDate: { toDate: () => Date };
  amount: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'ACTIVE' | 'COMPLETED';
  customerDetails: {
    name: string;
    email: string;
    phone: string;
  };
}

const getStatusBadge = (status: string) => {
    switch (status) {
        case 'APPROVED':
            return <Badge className="border-cyan-300 bg-cyan-100 text-cyan-800 dark:border-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300">{status}</Badge>;
        case 'PENDING':
            return <Badge className="border-yellow-300 bg-yellow-100 text-yellow-800 dark:border-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300">{status}</Badge>;
        case 'ACTIVE':
            return <Badge className="border-green-300 bg-green-100 text-green-800 dark:border-green-700 dark:bg-green-900/50 dark:text-green-300">{status}</Badge>;
        case 'COMPLETED':
            return <Badge variant="secondary">{status}</Badge>;
        case 'REJECTED':
             return <Badge variant="destructive">{status}</Badge>;
        default:
            return <Badge variant="outline">{status}</Badge>;
    }
}

export default function VendorBookingsPage() {
    const { user, loading: userLoading } = useUser();
    const router = useRouter();
    const firestore = useFirestore();

    const userProfileRef = useMemo(() => {
        if (!user) return null;
        return doc(firestore, 'users', user.uid);
    }, [firestore, user]);

    const { data: userProfile, loading: profileLoading } = useDoc<UserProfile>(userProfileRef);

    const vendorBillboardsQuery = useMemo(() => {
        if (!user || !userProfile || (userProfile.role !== 'VENDOR' && userProfile.role !== 'ADMIN')) return null;
        // This assumes that the `vendorId` on a billboard document corresponds to the user's UID.
        // This may need adjustment if your data model links users to vendors differently.
        return query(collection(firestore, 'billboards'), where('vendorId', '==', user.uid));
    }, [firestore, user, userProfile]);

    const { data: vendorBillboards, loading: billboardsLoading } = useCollection<Billboard>(vendorBillboardsQuery);
    
    const billboardIds = useMemo(() => {
        if (!vendorBillboards) return [];
        return vendorBillboards.map(b => b.id);
    }, [vendorBillboards]);

    const bookingsQuery = useMemo(() => {
        if (!billboardIds || billboardIds.length === 0) return null;
        // Firestore 'in' queries on snapshots are limited (often to 30 items).
        // For vendors with more billboards, a different data fetching strategy may be needed.
        if (billboardIds.length > 30) {
            console.warn("Querying bookings for more than 30 billboards, this may not work as expected with Firestore snapshots.");
        }
        return query(collection(firestore, 'bookings'), where('billboardId', 'in', billboardIds));
    }, [firestore, billboardIds]);

    const { data: bookings, loading: bookingsLoading } = useCollection<Booking>(bookingsQuery);

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

    if (isLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-background">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        );
    }
    
    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-headline text-3xl font-bold tracking-tight">
                    My Bookings
                </h1>
                <p className="text-muted-foreground">
                    An overview of all booking requests for your billboards.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Bookings</CardTitle>
                    <CardDescription>
                        A complete list of booking requests for your billboards.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead className="hidden lg:table-cell">Billboard</TableHead>
                                <TableHead className="hidden md:table-cell">Dates</TableHead>
                                <TableHead className="hidden lg:table-cell">Amount</TableHead>
                                <TableHead className="text-right">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isDataLoading && !bookings ? (
                                [...Array(5)].map((_, i) => (
                                    <TableRow key={i}>
                                        <TableCell><Skeleton className="h-6 w-32" /></TableCell>
                                        <TableCell className="hidden lg:table-cell"><Skeleton className="h-6 w-40" /></TableCell>
                                        <TableCell className="hidden md:table-cell"><Skeleton className="h-6 w-48" /></TableCell>
                                        <TableCell className="hidden lg:table-cell"><Skeleton className="h-6 w-24" /></TableCell>
                                        <TableCell className="text-right"><Skeleton className="h-6 w-20 ml-auto" /></TableCell>
                                    </TableRow>
                                ))
                            ) : bookings && bookings.length > 0 ? (
                                bookings.map((booking) => (
                                    <TableRow key={booking.id}>
                                        <TableCell>
                                            <div className="font-medium">{booking.customerDetails.name}</div>
                                            <div className="text-sm text-muted-foreground">{booking.customerDetails.email}</div>
                                        </TableCell>
                                        <TableCell className="hidden lg:table-cell">{booking.billboardTitle}</TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            {booking.startDate && booking.endDate ? 
                                                `${format(booking.startDate.toDate(), 'MMM d, yyyy')} - ${format(booking.endDate.toDate(), 'MMM d, yyyy')}`
                                                : 'N/A'
                                            }
                                        </TableCell>
                                        <TableCell className="hidden lg:table-cell">GH₵{booking.amount.toLocaleString()}</TableCell>
                                        <TableCell className="text-right">{getStatusBadge(booking.status)}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center">
                                        No bookings found for your billboards.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
