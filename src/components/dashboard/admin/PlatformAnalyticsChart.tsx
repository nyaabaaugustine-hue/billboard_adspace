'use client';

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { subMonths, startOfMonth, format as formatDate, isWithinInterval } from 'date-fns';
import { useMemo } from 'react';
import type { FirestoreBooking, UserProfile } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';


const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'hsl(var(--chart-1))',
  },
  users: {
    label: 'New Users',
    color: 'hsl(var(--chart-2))',
  },
  bookings: {
    label: 'Bookings',
    color: 'hsl(var(--chart-4))',
  }
};

interface PlatformAnalyticsChartProps {
    className?: string;
    bookings: FirestoreBooking[];
    users: UserProfile[];
    loading: boolean;
}

export function PlatformAnalyticsChart({ className, bookings, users, loading }: PlatformAnalyticsChartProps) {

    const chartData = useMemo(() => {
        const sixMonthsAgo = startOfMonth(subMonths(new Date(), 5));
        
        // Initialize 6 months of data
        const monthlyData = Array.from({ length: 6 }).map((_, i) => {
            const date = subMonths(new Date(), 5 - i);
            return {
                month: formatDate(date, 'MMM'),
                revenue: 0,
                users: 0,
                bookings: 0
            };
        });

        const interval = { start: sixMonthsAgo, end: new Date() };

        // Process completed bookings for revenue
        bookings.forEach(booking => {
            if (booking.status === 'COMPLETED' && booking.endDate && isWithinInterval(booking.endDate.toDate(), interval)) {
                const monthStr = formatDate(booking.endDate.toDate(), 'MMM');
                const monthData = monthlyData.find(m => m.month === monthStr);
                if (monthData) {
                    monthData.revenue += booking.amount;
                }
            }
        });
        
        // Process all bookings for count
        bookings.forEach(booking => {
            if (booking.createdAt && isWithinInterval(booking.createdAt.toDate(), interval)) {
                const monthStr = formatDate(booking.createdAt.toDate(), 'MMM');
                const monthData = monthlyData.find(m => m.month === monthStr);
                if (monthData) {
                    monthData.bookings += 1;
                }
            }
        });

        // Process new users
        users.forEach(user => {
            if (user.createdAt && isWithinInterval(user.createdAt.toDate(), interval)) {
                const monthStr = formatDate(user.createdAt.toDate(), 'MMM');
                const monthData = monthlyData.find(m => m.month === monthStr);
                if (monthData) {
                    monthData.users += 1;
                }
            }
        });

        return monthlyData;
    }, [bookings, users]);

    if (loading) {
        return (
            <Card className={cn(className)}>
                <CardHeader>
                    <Skeleton className="h-7 w-48" />
                    <Skeleton className="h-4 w-56" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-[250px] w-full" />
                </CardContent>
                <CardFooter>
                    <Skeleton className="h-4 w-3/4" />
                </CardFooter>
            </Card>
        )
    }

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Platform Analytics</CardTitle>
        <CardDescription>Revenue, new users, and bookings.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--chart-1))" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => `GH₵${value/1000}k`} />
              <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--chart-2))" tickLine={false} axisLine={false} tickMargin={8} />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar yAxisId="left" dataKey="revenue" fill="hsl(var(--chart-1))" name="Revenue" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="right" dataKey="users" fill="hsl(var(--chart-2))" name="New Users" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="right" dataKey="bookings" fill="hsl(var(--chart-4))" name="Bookings" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="text-muted-foreground">
            Showing data for the last 6 months.
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
