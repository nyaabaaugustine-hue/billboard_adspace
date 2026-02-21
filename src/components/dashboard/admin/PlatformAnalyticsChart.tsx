'use client';

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

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

const chartData = [
    { month: 'Jul', revenue: 1860, users: 80, bookings: 40 },
    { month: 'Aug', revenue: 3050, users: 200, bookings: 60 },
    { month: 'Sep', revenue: 2370, users: 120, bookings: 50 },
    { month: 'Oct', revenue: 1730, users: 190, bookings: 80 },
    { month: 'Nov', revenue: 2090, users: 220, bookings: 70 },
    { month: 'Dec', revenue: 2140, users: 250, bookings: 90 },
];

const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'hsl(var(--chart-1))',
  },
  users: {
    label: 'Users',
    color: 'hsl(var(--chart-2))',
  },
  bookings: {
    label: 'Bookings',
    color: 'hsl(var(--chart-4))',
  }
};

export function PlatformAnalyticsChart({ className }: { className?: string }) {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Platform Analytics</CardTitle>
        <CardDescription>Revenue, user sign-ups, and bookings.</CardDescription>
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
              <Bar yAxisId="right" dataKey="users" fill="hsl(var(--chart-2))" name="Users" radius={[4, 4, 0, 0]} />
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
