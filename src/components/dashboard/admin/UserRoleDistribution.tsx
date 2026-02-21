'use client';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useMemo } from 'react';
import type { UserProfile } from '@/lib/types';
import { Skeleton } from "@/components/ui/skeleton";

const COLORS = ['hsl(var(--chart-2))', 'hsl(var(--chart-1))', 'hsl(var(--chart-5))'];

interface UserRoleDistributionProps {
    className?: string;
    users: UserProfile[];
    loading: boolean;
}

export function UserRoleDistribution({ className, users, loading }: UserRoleDistributionProps) {
    const data = useMemo(() => {
        const roles = {
            'Users': users.filter(u => u.role === 'USER').length,
            'Vendors': users.filter(u => u.role === 'VENDOR').length,
            'Admins': users.filter(u => u.role === 'ADMIN').length,
        };
        return Object.entries(roles).map(([name, value]) => ({ name, value }));
    }, [users]);

    if (loading) {
        return (
            <Card className={className}>
                <CardHeader>
                    <Skeleton className="h-7 w-48" />
                    <Skeleton className="h-4 w-56" />
                </CardHeader>
                <CardContent className="flex justify-center items-center">
                    <Skeleton className="h-56 w-56 rounded-full" />
                </CardContent>
            </Card>
        )
    }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>User Role Distribution</CardTitle>
        <CardDescription>Breakdown of user roles on the platform.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}} className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                    {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip formatter={(value) => typeof value === 'number' ? value.toLocaleString() : value} />
                <Legend />
                </PieChart>
            </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
