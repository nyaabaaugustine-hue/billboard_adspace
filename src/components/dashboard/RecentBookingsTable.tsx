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
  
  const bookings = [
    {
      customer: 'Olivia Martin',
      email: 'olivia.martin@email.com',
      avatar: '/avatars/01.png',
      billboard: 'Spintex Road Digital',
      amount: '15,000.00',
      status: 'Approved',
    },
    {
      customer: 'Jackson Lee',
      email: 'jackson.lee@email.com',
      avatar: '/avatars/02.png',
      billboard: 'Accra Mall Unipole',
      amount: '12,000.00',
      status: 'Pending',
    },
    {
      customer: 'Isabella Nguyen',
      email: 'isabella.nguyen@email.com',
      avatar: '/avatars/03.png',
      billboard: 'Osu Oxford Street Digital',
      amount: '20,000.00',
      status: 'Approved',
    },
    {
      customer: 'William Kim',
      email: 'will@email.com',
      avatar: '/avatars/04.png',
      billboard: 'Tema Motorway Unipole',
      amount: '13,000.00',
      status: 'Active',
    },
    {
      customer: 'Sofia Davis',
      email: 'sofia.davis@email.com',
      avatar: '/avatars/05.png',
      billboard: 'Lapaz Gantry Billboard',
      amount: '11,000.00',
      status: 'Completed',
    },
  ];

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
  
  export function RecentBookingsTable() {
    return (
      <Card>
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
                <TableHead className="hidden sm:table-cell">Billboard</TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.email}>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarImage src={booking.avatar} alt="Avatar" />
                        <AvatarFallback>{booking.customer.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">
                          {booking.customer}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {booking.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {booking.billboard}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {getStatusBadge(booking.status)}
                  </TableCell>
                  <TableCell className="text-right">GH₵{booking.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }
