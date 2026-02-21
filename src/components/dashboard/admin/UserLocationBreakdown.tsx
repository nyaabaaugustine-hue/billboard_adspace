'use client';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useMemo } from 'react';
import type { Billboard } from '@/lib/types';
import { regions as allRegions } from '@/lib/data';
import { Skeleton } from "@/components/ui/skeleton";

interface BillboardLocationBreakdownProps {
    className?: string;
    billboards: Billboard[];
    loading: boolean;
}

export function UserLocationBreakdown({ className, billboards, loading }: BillboardLocationBreakdownProps) {
    const locations = useMemo(() => {
        const totalBillboards = billboards.length;
        if (totalBillboards === 0) return [];

        const countsByRegion = billboards.reduce((acc, billboard) => {
            const regionName = allRegions.find(r => r.id === billboard.regionId)?.name || 'Other';
            acc[regionName] = (acc[regionName] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        return Object.entries(countsByRegion)
            .map(([name, count]) => ({
                name,
                percentage: Math.round((count / totalBillboards) * 100),
            }))
            .sort((a, b) => b.percentage - a.percentage);

    }, [billboards]);

    if(loading) {
        return (
            <Card className={className}>
                <CardHeader>
                    <Skeleton className="h-7 w-48" />
                    <Skeleton className="h-4 w-56" />
                </CardHeader>
                <CardContent className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="space-y-2">
                             <div className="flex justify-between">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-12" />
                            </div>
                            <Skeleton className="h-2 w-full" />
                        </div>
                    ))}
                </CardContent>
            </Card>
        )
    }

  return (
    <Card className={className}>
        <CardHeader>
            <CardTitle>Billboard Location Breakdown</CardTitle>
            <CardDescription>Geographic distribution of billboards in Ghana.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {locations.length > 0 ? locations.map(location => (
                <div key={location.name} className="space-y-1">
                    <div className="flex justify-between text-sm">
                        <span className="font-medium">{location.name}</span>
                        <span className="text-muted-foreground">{location.percentage}%</span>
                    </div>
                    <Progress value={location.percentage} className="h-2" />
                </div>
            )) : <p className="text-sm text-muted-foreground text-center py-4">No billboard data available.</p>}
        </CardContent>
    </Card>
  )
}
