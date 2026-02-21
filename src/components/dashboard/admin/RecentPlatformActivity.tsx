'use client';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Event as PlatformEvent } from "@/lib/types";
import { format } from 'date-fns';
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

const EventDescription = ({ event }: { event: PlatformEvent }) => {
    switch (event.type) {
        case 'USER_SIGNED_UP':
            return <>New user registered: <span className="font-semibold text-foreground">{event.details.displayName}</span></>;
        case 'BOOKING_REQUESTED':
            return <><span className="font-semibold text-foreground">{event.details.customerName}</span> requested to book <span className="font-semibold text-foreground">{event.details.billboardTitle}</span>.</>;
        case 'BOOKING_STATUS_CHANGED':
            return <>Booking for <span className="font-semibold text-foreground">...{event.entityId.slice(-4)}</span> changed to <Badge variant="secondary" className="text-xs">{event.details.newStatus}</Badge></>;
        default:
            return <>{`Event type: ${event.type}`}</>;
    }
}

interface RecentPlatformActivityProps {
    className?: string;
    events: PlatformEvent[];
    loading: boolean;
}

export function RecentPlatformActivity({ className, events, loading }: RecentPlatformActivityProps) {

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>Recent Platform Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-72">
                    <div className="space-y-4">
                        {loading ? (
                            [...Array(7)].map((_, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-3 w-1/4" />
                                    </div>
                                </div>
                            ))
                        ) : (events && events.length > 0) ? (
                            events.map((event) => (
                                <div key={event.id} className="flex items-center gap-4">
                                    <div className="flex-1">
                                        <p className="text-sm font-medium"><EventDescription event={event} /></p>
                                        <p className="text-xs text-muted-foreground">
                                            {event.timestamp ? format(event.timestamp.toDate(), 'MMM d, hh:mm a') : 'just now'}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-muted-foreground text-center pt-10">No recent activity.</p>
                        )}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}
