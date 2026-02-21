'use client';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function MapOverview({ className }: { className?: string }) {
    return (
        <Card className={cn(className)}>
            <CardHeader>
                <CardTitle>Billboards Heatmap</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="relative aspect-video w-full rounded-md bg-muted overflow-hidden">
                    <Image 
                        src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1771789704/ghana-map_frcrxc.png"
                        alt="Map of Ghana"
                        fill
                        className="object-contain p-4"
                        data-ai-hint="map ghana"
                    />
                     <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
                </div>
            </CardContent>
        </Card>
    )
}
