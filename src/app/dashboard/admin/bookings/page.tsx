'use client';

import { useState, useMemo } from 'react';
import { useCollection, useFirestore, useUser } from '@/firebase';
import { collection, doc, updateDoc, type DocumentData, addDoc, serverTimestamp } from 'firebase/firestore';
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
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

// Define the booking type with nested customer details
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

export default function AdminBookingsPage() {
    const firestore = useFirestore();
    const { user } = useUser();
    const bookingsCol = useMemo(() => collection(firestore, 'bookings'), [firestore]);
    const { data: bookings, loading } = useCollection<Booking>(bookingsCol);
    const { toast } = useToast();
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    const handleUpdateStatus = async (bookingId: string, status: Booking['status']) => {
        setUpdatingId(bookingId);
        try {
            const bookingRef = doc(firestore, 'bookings', bookingId);
            await updateDoc(bookingRef, { status });

            const eventsCol = collection(firestore, 'events');
            await addDoc(eventsCol, {
                type: 'BOOKING_STATUS_CHANGED',
                userId: user?.uid || 'ADMIN_ACTION',
                entityId: bookingId,
                entityType: 'booking',
                timestamp: serverTimestamp(),
                details: {
                    newStatus: status,
                    bookingId: bookingId,
                    adminName: user?.displayName || 'Admin',
                }
            });

            toast({
                title: 'Booking Updated',
                description: `The booking has been successfully ${status.toLowerCase()}.`,
            });
        } catch (error) {
            console.error("Error updating booking status: ", error);
            toast({
                variant: 'destructive',
                title: 'Update Failed',
                description: 'There was a problem updating the booking status.',
            });
        } finally {
            setUpdatingId(null);
        }
    };
    
    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-headline text-3xl font-bold tracking-tight">
                    Manage Bookings
                </h1>
                <p className="text-muted-foreground">
                    Review, approve, and manage all booking requests on the platform.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Bookings</CardTitle>
                    <CardDescription>
                        A complete list of all booking requests and their current status.
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
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                [...Array(5)].map((_, i) => (
                                    <TableRow key={i}>
                                        <TableCell><Skeleton className="h-6 w-32" /></TableCell>
                                        <TableCell className="hidden lg:table-cell"><Skeleton className="h-6 w-40" /></TableCell>
                                        <TableCell className="hidden md:table-cell"><Skeleton className="h-6 w-48" /></TableCell>
                                        <TableCell className="hidden lg:table-cell"><Skeleton className="h-6 w-24" /></TableCell>
                                        <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                                        <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
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
                                        <TableCell>{getStatusBadge(booking.status)}</TableCell>
                                        <TableCell className="text-right">
                                            {updatingId === booking.id ? (
                                                <Loader2 className="h-5 w-5 animate-spin ml-auto" />
                                            ) : (
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button size="icon" variant="ghost">
                                                            <MoreHorizontal className="h-5 w-5" />
                                                            <span className="sr-only">Actions</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem 
                                                            disabled={booking.status === 'APPROVED' || booking.status === 'ACTIVE'}
                                                            onClick={() => handleUpdateStatus(booking.id, 'APPROVED')}
                                                        >
                                                            Approve
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem 
                                                            disabled={booking.status === 'REJECTED'}
                                                            onClick={() => handleUpdateStatus(booking.id, 'REJECTED')}
                                                            className="text-destructive"
                                                        >
                                                            Reject
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem 
                                                            disabled={booking.status !== 'APPROVED'}
                                                            onClick={() => handleUpdateStatus(booking.id, 'ACTIVE')}
                                                        >
                                                            Mark as Active
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                             disabled={booking.status !== 'ACTIVE'}
                                                            onClick={() => handleUpdateStatus(booking.id, 'COMPLETED')}
                                                        >
                                                            Mark as Completed
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center">
                                        No bookings found.
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
