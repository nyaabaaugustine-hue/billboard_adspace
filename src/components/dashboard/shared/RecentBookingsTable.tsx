import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from '@/components/ui/avatar';
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
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from '@/components/ui/dropdown-menu';
  import { Button } from '@/components/ui/button';
  import { MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { bookings } from '@/lib/data';
  
  const getStatusBadge = (status: string) => {
    switch (status) {
        case 'Approved':
            return <Badge className="border-cyan-300 bg-cyan-100 text-cyan-800 dark:border-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300">{status}</Badge>;
        case 'Pending':
            return <Badge className="border-yellow-300 bg-yellow-100 text-yellow-800 dark:border-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300">{status}</Badge>;
        case 'Active':
            return <Badge className="border-green-300 bg-green-100 text-green-800 dark:border-green-700 dark:bg-green-900/50 dark:text-green-300">{status}</Badge>;
        case 'Completed':
            return <Badge variant="secondary">{status}</Badge>;
        default:
            return <Badge variant="outline">{status}</Badge>;
    }
  }
  
  export function RecentBookingsTable({ className }: { className?: string }) {
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
                <TableHead className="hidden xl:table-cell">Billboard</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>
                    <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.email}>
                  <TableCell>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">
                        {booking.customer}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {booking.email}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden xl:table-cell">
                    {booking.billboard}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {getStatusBadge(booking.status)}
                  </TableCell>
                  <TableCell className="text-right">GH₵{booking.amount.toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                   <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Approve</DropdownMenuItem>
                        <DropdownMenuItem>Reject</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }
