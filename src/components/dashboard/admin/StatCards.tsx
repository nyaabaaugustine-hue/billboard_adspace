'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign, Users, Shield, Megaphone, type LucideIcon } from "lucide-react";
import { useInView } from 'framer-motion';
import { useEffect, useRef, useMemo } from "react";
import { animate } from 'framer-motion';
import { Skeleton } from "@/components/ui/skeleton";
import type { UserProfile, Billboard, FirestoreBooking } from "@/lib/types";

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


interface StatCardsProps {
    users: UserProfile[];
    billboards: Billboard[];
    bookings: FirestoreBooking[];
    loading: boolean;
}

export function StatCards({ users, billboards, bookings, loading }: StatCardsProps) {

    const stats = useMemo(() => {
        const totalRevenue = bookings
            .filter(b => b.status === 'COMPLETED')
            .reduce((sum, b) => sum + b.amount, 0);

        const activeUsers = users.length;
        const listedBillboards = billboards.length;
        const pendingBookings = bookings.filter(b => b.status === 'PENDING').length;
        
        return [
          {
            title: "Total Revenue",
            value: totalRevenue,
            prefix: "GH₵",
            change: "From all completed bookings",
            icon: DollarSign,
          },
          {
            title: "Active Users",
            value: activeUsers,
            prefix: "",
            change: "Total registered users",
            icon: Users,
          },
          {
            title: "Listed Billboards",
            value: listedBillboards,
            prefix: "",
            change: "Total billboards on the platform",
            icon: Megaphone,
          },
          {
            title: "Pending Bookings",
            value: pendingBookings,
            prefix: "",
            change: "Require admin approval",
            icon: Shield,
          },
        ];
    }, [users, billboards, bookings]);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} loading={loading} />
      ))}
    </div>
  );
}
