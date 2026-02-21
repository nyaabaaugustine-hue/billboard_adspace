import { Badge } from '@/components/ui/badge';
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
import { cn } from '@/lib/utils';
import type { FirestoreBooking } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
  
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
  
  interface RecentBookingsTableProps {
    className?: string;
    bookings: FirestoreBooking[];
    loading: boolean;
  }

  export function RecentBookingsTable({ className, bookings, loading }: RecentBookingsTableProps) {
    
    const sortedBookings = bookings.sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate()).slice(0, 5);
    
    return (
      <Card className={cn(className)}>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
          <CardDescription>
            An overview of the most recent booking requests.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right hidden sm:table-cell">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-6 w-32" /></TableCell>
                    <TableCell className="hidden sm:table-cell"><Skeleton className="h-6 w-20" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-6 w-24 ml-auto" /></TableCell>
                    <TableCell className="text-right hidden sm:table-cell"><Skeleton className="h-6 w-28 ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : sortedBookings.length > 0 ? (
                  sortedBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>
                        <div className="grid gap-1">
                          <p className="text-sm font-medium leading-none">
                            {booking.customerDetails.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {booking.customerDetails.email}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {getStatusBadge(booking.status)}
                      </TableCell>
                      <TableCell className="text-right">GH₵{booking.amount.toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                      <TableCell className="text-right hidden sm:table-cell">
                        {booking.createdAt ? format(booking.createdAt.toDate(), 'MMM d, yyyy') : 'N/A'}
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No recent bookings found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }
