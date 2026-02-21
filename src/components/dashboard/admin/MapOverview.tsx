'use client';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import dynamic from 'next/dynamic';
import type { MapBillboard, Billboard } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

const InteractiveMap = dynamic(() => import('@/components/map/InteractiveMap'), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full" />,
});

interface MapOverviewProps {
    className?: string;
    billboards: Billboard[];
    loading: boolean;
}

export function MapOverview({ className, billboards, loading }: MapOverviewProps) {
    const mapBillboardsData: MapBillboard[] = (billboards || []).map((b) => ({
        id: b.id,
        title: b.title,
        latitude: b.latitude,
        longitude: b.longitude,
        pricePerMonth: b.pricePerMonth,
        city: b.city,
      }));

    return (
        <Card className={cn("flex flex-col", className)}>
            <CardHeader>
                <CardTitle>Billboards Heatmap</CardTitle>
                <CardDescription>An overview of all billboard locations.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <div className="relative aspect-video w-full rounded-md bg-muted overflow-hidden border">
                    {loading ? (
                        <Skeleton className="h-full w-full" />
                    ) : (
                        <InteractiveMap billboards={mapBillboardsData} />
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
