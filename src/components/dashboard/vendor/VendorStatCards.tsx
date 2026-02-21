'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign, Megaphone, Briefcase, Star } from "lucide-react";
import { useInView } from 'framer-motion';
import { useEffect, useRef, useMemo } from "react";
import { animate } from 'framer-motion';
import type { Billboard, FirestoreBooking } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

const StatCard = ({ title, value, prefix = "", change, icon: Icon, isRating = false, loading }: { title: string, value: number, prefix?: string, change: string, icon: React.ElementType, isRating?: boolean, loading: boolean }) => {
    
    if (loading) {
        return (
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{title}</CardTitle>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-7 w-24 mb-1" />
                    <Skeleton className="h-3 w-32" />
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">
                    <Counter from={0} to={value} prefix={prefix} isRating={isRating} />
                </div>
                <p className="text-xs text-muted-foreground">{change}</p>
            </CardContent>
        </Card>
    )
}

function Counter({ from, to, prefix, isRating }: { from: number; to: number, prefix: string, isRating?: boolean }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView && ref.current) {
      const controls = animate(from, to, {
        duration: 1.5,
        onUpdate(value) {
          if (ref.current) {
            if(isRating) {
                ref.current.textContent = prefix + value.toFixed(1);
            } else {
                ref.current.textContent = prefix + value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
          }
        },
      });
      return () => controls.stop();
    }
  }, [from, to, inView, prefix, isRating]);

  return <p ref={ref} className="text-2xl font-bold">{prefix}{isRating ? from.toFixed(1) : from.toLocaleString()}</p>;
}

interface VendorStatCardsProps {
    billboards: Billboard[];
    bookings: FirestoreBooking[];
    loading: boolean;
}

export function VendorStatCards({ billboards, bookings, loading }: VendorStatCardsProps) {

  const stats = useMemo(() => {
    const totalEarnings = bookings
        .filter(b => b.status === 'COMPLETED')
        .reduce((sum, b) => sum + b.amount, 0);

    const activeBookings = bookings.filter(b => b.status === 'ACTIVE').length;
    
    const listedBillboards = billboards.length;

    const averageRating = listedBillboards > 0 
        ? billboards.reduce((acc, b) => acc + b.visibilityScore, 0) / listedBillboards
        : 0;

    return [
      {
        title: "Total Earnings",
        value: totalEarnings,
        prefix: "GH₵ ",
        change: "From completed bookings",
        icon: DollarSign,
      },
      {
        title: "Active Bookings",
        value: activeBookings,
        prefix: "",
        change: "Currently running on your boards",
        icon: Briefcase,
      },
      {
        title: "Listed Billboards",
        value: listedBillboards,
        prefix: "",
        change: "Total billboards you manage",
        icon: Megaphone,
      },
      {
        title: "Avg. Visibility",
        value: averageRating,
        prefix: "",
        change: "out of 10",
        isRating: true,
        icon: Star,
      },
    ];
  }, [billboards, bookings]);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} loading={loading} />
      ))}
    </div>
  );
}
