import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { FirestoreBooking, Billboard, Vendor } from "@/lib/types";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface TopPerformersProps {
    className?: string;
    bookings: FirestoreBooking[];
    billboards: Billboard[];
    vendors: Vendor[];
    loading: boolean;
}

export function TopPerformers({ className, bookings, billboards, vendors, loading }: TopPerformersProps) {
    
  const { topVendors, topBillboards } = useMemo(() => {
    if (!bookings.length || !billboards.length || !vendors.length) {
        return { topVendors: [], topBillboards: [] };
    }
    
    // Calculate top vendors by earnings
    const vendorEarnings = bookings.reduce((acc, booking) => {
        if (booking.status === 'COMPLETED') {
            const billboard = billboards.find(b => b.id === booking.billboardId);
            if (billboard && billboard.vendorId) {
                const vendorInfo = vendors.find(v => v.id === billboard.vendorId)
                if (vendorInfo) {
                    acc[billboard.vendorId] = (acc[billboard.vendorId] || 0) + booking.amount;
                }
            }
        }
        return acc;
    }, {} as Record<string, number>);

    const sortedVendorIds = Object.keys(vendorEarnings).sort((a, b) => vendorEarnings[b] - vendorEarnings[a]);
    
    const topVendorsData = sortedVendorIds.slice(0, 2).map(vendorId => {
        const vendor = vendors.find(v => v.id === vendorId);
        return vendor ? { ...vendor, earnings: vendorEarnings[vendorId] } : null;
    }).filter(Boolean);

    // Calculate top billboards by booking count
    const billboardBookingCounts = bookings.reduce((acc, booking) => {
        acc[booking.billboardId] = (acc[booking.billboardId] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);
    
    const sortedBillboardIds = Object.keys(billboardBookingCounts).sort((a, b) => billboardBookingCounts[b] - billboardBookingCounts[a]);

    const topBillboardsData = sortedBillboardIds.slice(0, 2).map(billboardId => {
        const billboard = billboards.find(b => b.id === billboardId);
        return billboard ? { ...billboard, bookingCount: billboardBookingCounts[billboardId] } : null;
    }).filter(Boolean);

    return { topVendors: topVendorsData as (Vendor & {earnings: number})[], topBillboards: topBillboardsData as (Billboard & {bookingCount: number})[] };

  }, [bookings, billboards, vendors]);
  
  if (loading) {
      return (
          <Card className={cn(className)}>
              <CardHeader>
                  <Skeleton className="h-7 w-32" />
                  <Skeleton className="h-4 w-48" />
              </CardHeader>
              <CardContent className="grid gap-6">
                  <div>
                      <Skeleton className="h-4 w-24 mb-3" />
                      <div className="space-y-4">
                          {[...Array(2)].map((_, i) => (
                              <div key={i} className="flex items-center">
                                  <Skeleton className="h-9 w-9 rounded-full" />
                                  <div className="ml-4 space-y-1">
                                      <Skeleton className="h-4 w-24" />
                                      <Skeleton className="h-3 w-16" />
                                  </div>
                                  <Skeleton className="ml-auto h-4 w-20" />
                              </div>
                          ))}
                      </div>
                  </div>
                  <div>
                      <Skeleton className="h-4 w-32 mb-3" />
                      <div className="space-y-4">
                          {[...Array(2)].map((_, i) => (
                              <div key={i} className="flex items-center">
                                  <Skeleton className="w-12 h-9 rounded-md mr-4" />
                                  <div className="space-y-1">
                                      <Skeleton className="h-4 w-28" />
                                      <Skeleton className="h-3 w-12" />
                                  </div>
                                  <Skeleton className="ml-auto h-5 w-24" />
                              </div>
                          ))}
                      </div>
                  </div>
              </CardContent>
          </Card>
      );
  }

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Top Performers</CardTitle>
        <CardDescription>Your top-performing vendors and billboards.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Top Vendors</h3>
          <div className="space-y-4">
            {topVendors.length > 0 ? topVendors.map((vendor) => (
              <div key={vendor.id} className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={vendor.imageUrl} alt={vendor.name} data-ai-hint="company logo"/>
                  <AvatarFallback>{vendor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">{vendor.name}</p>
                  <p className="text-sm text-muted-foreground">{vendor.region}</p>
                </div>
                <div className="ml-auto font-medium flex items-center gap-1 text-sm">
                    +GH₵{Math.round(vendor.earnings / 1000)}k <ArrowUpRight className="h-4 w-4 text-green-500" />
                </div>
              </div>
            )) : <p className="text-sm text-muted-foreground">Not enough data.</p>}
          </div>
        </div>
        <div>
           <h3 className="text-sm font-medium text-muted-foreground mb-3">High-Performing Boards</h3>
           <div className="space-y-4">
            {topBillboards.length > 0 ? topBillboards.map((billboard) => (
              <div key={billboard.id} className="flex items-center">
                 <div className="relative w-12 h-9 rounded-md overflow-hidden mr-4 bg-muted">
                    <Image src={billboard.imageUrl} alt={billboard.title} fill className="object-cover" data-ai-hint="billboard image" />
                 </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none truncate max-w-[150px]">{billboard.title}</p>
                  <p className="text-sm text-muted-foreground">{billboard.city}</p>
                </div>
                <div className="ml-auto">
                    <Badge variant="secondary">{billboard.bookingCount} Booking{billboard.bookingCount > 1 ? 's' : ''}</Badge>
                </div>
              </div>
            )) : <p className="text-sm text-muted-foreground">Not enough data.</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
