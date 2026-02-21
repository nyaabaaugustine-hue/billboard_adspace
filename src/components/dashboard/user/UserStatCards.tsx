'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign, Target, Briefcase, Heart, type LucideIcon } from "lucide-react";
import { useInView } from 'framer-motion';
import { useEffect, useRef, useMemo } from "react";
import { animate } from 'framer-motion';
import { Skeleton } from "@/components/ui/skeleton";
import type { FirestoreBooking } from "@/lib/types";


function Counter({ from, to, prefix }: { from: number; to: number, prefix: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView && ref.current) {
      const controls = animate(from, to, {
        duration: 1.5,
        onUpdate(value) {
          if (ref.current) {
            ref.current.textContent = prefix + value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          }
        },
      });
      return () => controls.stop();
    }
  }, [from, to, inView, prefix]);

  return <p ref={ref} className="text-2xl font-bold">{prefix}{from.toLocaleString()}</p>;
}

const StatCard = ({ title, value, prefix, change, icon: Icon, loading }: { title: string, value: number, prefix: string, change: string, icon: LucideIcon, loading: boolean }) => {
    if (loading) {
        return (
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{title}</CardTitle>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-7 w-24 mb-1" />
                    <Skeleton className="h-3 w-full" />
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
                    <Counter from={0} to={value} prefix={prefix} />
                </div>
                <p className="text-xs text-muted-foreground">{change}</p>
            </CardContent>
        </Card>
    );
};


interface UserStatCardsProps {
    bookings: FirestoreBooking[];
    loading: boolean;
}

export function UserStatCards({ bookings, loading }: UserStatCardsProps) {
  
  const stats = useMemo(() => {
      const totalSpent = bookings
          .filter(b => b.status === 'COMPLETED')
          .reduce((sum, b) => sum + b.amount, 0);

      const activeCampaigns = bookings.filter(b => b.status === 'ACTIVE').length;
      
      const totalBookings = bookings.length;

      const completedBookings = bookings.filter(b => b.status === 'COMPLETED').length;
      
      return [
        {
          title: "Total Spent",
          value: totalSpent,
          prefix: "GH₵",
          change: `${completedBookings} completed campaigns`,
          icon: DollarSign,
        },
        {
          title: "Active Campaigns",
          value: activeCampaigns,
          prefix: "",
          change: "Currently running",
          icon: Target,
        },
        {
          title: "Total Bookings",
          value: totalBookings,
          prefix: "",
          change: "Across all campaigns",
          icon: Briefcase,
        },
        {
          title: "Saved Billboards",
          value: 0,
          prefix: "",
          change: "Feature coming soon",
          icon: Heart,
        },
      ];
  }, [bookings]);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} loading={loading} />
      ))}
    </div>
  );
}
