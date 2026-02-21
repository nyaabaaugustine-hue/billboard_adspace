'use client';

import { TrendingUp } from 'lucide-react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import { subMonths, startOfMonth, format as formatDate, isAfter } from 'date-fns';

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
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { cn } from '@/lib/utils';
import type { FirestoreBooking } from '@/lib/types';
import { useMemo } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'hsl(var(--primary))',
  },
};

interface RevenueChartProps {
    className?: string;
    bookings: FirestoreBooking[];
    loading: boolean;
}

export function RevenueChart({ className, bookings, loading }: RevenueChartProps) {
    const chartData = useMemo(() => {
        const sixMonthsAgo = startOfMonth(subMonths(new Date(), 5));
        
        const monthlyRevenue = Array.from({ length: 6 }).map((_, i) => {
            const date = subMonths(new Date(), 5 - i);
            return {
                month: formatDate(date, 'MMM'),
                revenue: 0,
            };
        });

        bookings
            .filter(booking => booking.status === 'COMPLETED' && booking.endDate && isAfter(booking.endDate.toDate(), sixMonthsAgo))
            .forEach(booking => {
                const monthStr = formatDate(booking.endDate.toDate(), 'MMM');
                const monthData = monthlyRevenue.find(m => m.month === monthStr);
                if (monthData) {
                    monthData.revenue += booking.amount;
                }
            });

        return monthlyRevenue;
    }, [bookings]);

    if(loading) {
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
                    <div className="flex w-full items-start gap-2 text-sm">
                        <Skeleton className="h-4 w-full" />
                    </div>
                </CardFooter>
            </Card>
        )
    }

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Revenue Over Time</CardTitle>
        <CardDescription>Completed bookings over the last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `GH₵${value / 1000}k`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Line
              dataKey="revenue"
              type="natural"
              stroke="var(--color-revenue)"
              strokeWidth={2}
              dot={{
                fill: 'var(--color-revenue)',
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing total revenue for the last 6 months
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
