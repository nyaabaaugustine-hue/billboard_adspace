'use client';

import { useMemo } from 'react';
import { useCollection, useFirestore, useUser } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import type { Billboard } from '@/lib/types';
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
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
  
  const getStatusBadge = (status: string) => {
    switch (status) {
        case 'Rented':
            return <Badge variant="secondary">{status}</Badge>;
        case 'On Hold':
            return <Badge className="border-yellow-300 bg-yellow-100 text-yellow-800 dark:border-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300">{status}</Badge>;
        case 'Available':
        default:
            return <Badge className="border-green-300 bg-green-100 text-green-800 dark:border-green-700 dark:bg-green-900/50 dark:text-green-300">{status}</Badge>;
    }
  }
  
  export function VendorBillboardsTable({ className }: { className?: string }) {
    const { user } = useUser();
    const firestore = useFirestore();

    const vendorBillboardsQuery = useMemo(() => {
        if (!user) return null;
        return query(collection(firestore, 'billboards'), where('vendorId', '==', user.uid));
    }, [firestore, user]);

    const { data: vendorBillboards, loading } = useCollection<Billboard>(vendorBillboardsQuery);

    return (
      <Card className={cn(className)}>
        <CardHeader>
          <CardTitle>My Billboards</CardTitle>
          <CardDescription>
            Manage your active and pending billboard listings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Billboard</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="hidden md:table-cell">Price/Month</TableHead>
                <TableHead className="hidden lg:table-cell">Traffic/Day</TableHead>
                <TableHead>
                    <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                [...Array(3)].map((_, i) => (
                    <TableRow key={i}>
                        <TableCell>
                            <div className="flex items-center gap-4">
                                <Skeleton className="h-12 w-16 rounded-md hidden sm:block" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-48" />
                                    <Skeleton className="h-3 w-24" />
                                </div>
                            </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell"><Skeleton className="h-6 w-20" /></TableCell>
                        <TableCell className="hidden md:table-cell"><Skeleton className="h-6 w-24" /></TableCell>
                        <TableCell className="hidden lg:table-cell"><Skeleton className="h-6 w-24" /></TableCell>
                        <TableCell><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                    </TableRow>
                ))
              ) : vendorBillboards && vendorBillboards.length > 0 ? (
                vendorBillboards.map((billboard) => (
                    <TableRow key={billboard.id}>
                    <TableCell>
                        <div className="flex items-center gap-4">
                            <div className="relative w-16 h-12 rounded-md overflow-hidden bg-muted hidden sm:block">
                                <Image src={billboard.imageUrl} alt={billboard.title} fill className="object-cover" data-ai-hint="billboard image" />
                            </div>
                            <div className="grid gap-1">
                                <p className="text-sm font-medium leading-none truncate max-w-[200px] sm:max-w-none">
                                    {billboard.title}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {billboard.city}
                                </p>
                            </div>
                        </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                        {getStatusBadge(billboard.status)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">GH₵{billboard.pricePerMonth.toLocaleString()}</TableCell>
                    <TableCell className="hidden lg:table-cell">{billboard.trafficEstimate.toLocaleString()}</TableCell>
                    <TableCell>
                        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>View Bookings</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Archive</DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                    </TableRow>
                ))
              ) : (
                <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                        You have not added any billboards yet.
                    </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }
