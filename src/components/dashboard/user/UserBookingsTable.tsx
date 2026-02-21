'use client';

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
import { Skeleton } from '@/components/ui/skeleton';
import { Briefcase } from 'lucide-react';
import type { FirestoreBooking } from '@/lib/types';
import { cn } from '@/lib/utils';


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

interface UserBookingsTableProps {
    bookings: FirestoreBooking[];
    loading: boolean;
    className?: string;
}

export function UserBookingsTable({ bookings, loading, className }: UserBookingsTableProps) {
    return (
        <Card className={cn(className)}>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-6 w-6" />
                    My Bookings
                </CardTitle>
                <CardDescription>
                    A complete history of all your billboard bookings.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Billboard</TableHead>
                            <TableHead className="hidden md:table-cell">Dates</TableHead>
                            <TableHead className="hidden sm:table-cell">Status</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            [...Array(3)].map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell><Skeleton className="h-6 w-40" /></TableCell>
                                    <TableCell className="hidden md:table-cell"><Skeleton className="h-6 w-48" /></TableCell>
                                    <TableCell className="hidden sm:table-cell"><Skeleton className="h-6 w-20" /></TableCell>
                                    <TableCell className="text-right"><Skeleton className="h-6 w-24 ml-auto" /></TableCell>
                                </TableRow>
                            ))
                        ) : bookings && bookings.length > 0 ? (
                            bookings.map((booking) => (
                                <TableRow key={booking.id}>
                                    <TableCell>
                                        <div className="font-medium">{booking.billboardTitle}</div>
                                    </TableCell>
                                     <TableCell className="hidden md:table-cell">
                                        {booking.startDate && booking.endDate ? 
                                            `${format(booking.startDate.toDate(), 'MMM d, yyyy')} - ${format(booking.endDate.toDate(), 'MMM d, yyyy')}`
                                            : 'N/A'
                                        }
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">{getStatusBadge(booking.status)}</TableCell>
                                    <TableCell className="text-right">GH₵{booking.amount.toLocaleString()}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center">
                                    You haven't made any bookings yet.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
