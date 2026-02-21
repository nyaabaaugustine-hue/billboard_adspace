'use client';

import { useMemo } from 'react';
import { useCollection, useFirestore } from '@/firebase';
import { collection, orderBy, query } from 'firebase/firestore';
import { format } from 'date-fns';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { User, Briefcase, Edit, UserPlus } from 'lucide-react';
import type { Event } from '@/lib/types';


const EventIcon = ({ eventType }: { eventType: string }) => {
    switch (eventType) {
        case 'USER_SIGNED_UP':
            return <UserPlus className="h-5 w-5 text-green-500" />;
        case 'BOOKING_REQUESTED':
            return <Briefcase className="h-5 w-5 text-blue-500" />;
        case 'BOOKING_STATUS_CHANGED':
            return <Edit className="h-5 w-5 text-orange-500" />;
        default:
            return <User className="h-5 w-5 text-muted-foreground" />;
    }
};

const EventDescription = ({ event }: { event: Event }) => {
    switch (event.type) {
        case 'USER_SIGNED_UP':
            return <>New user registered: <span className="font-semibold text-foreground">{event.details.displayName}</span> ({event.details.email})</>;
        case 'BOOKING_REQUESTED':
            return <><span className="font-semibold text-foreground">{event.details.customerName}</span> requested to book <span className="font-semibold text-foreground">{event.details.billboardTitle}</span>.</>;
        case 'BOOKING_STATUS_CHANGED':
            return <>Booking status for <span className="font-semibold text-foreground">ID: ...{event.entityId.slice(-6)}</span> was changed to <Badge variant="secondary">{event.details.newStatus}</Badge> by {event.details.adminName}.</>;
        default:
            return <>{`Event type: ${event.type}`}</>;
    }
}


export default function AdminActivityPage() {
    const firestore = useFirestore();
    const eventsQuery = useMemo(() => query(collection(firestore, 'events'), orderBy('timestamp', 'desc')), [firestore]);
    const { data: events, loading } = useCollection<Event>(eventsQuery);
    
    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-headline text-3xl font-bold tracking-tight">
                    Platform Activity Feed
                </h1>
                <p className="text-muted-foreground">
                    A real-time log of all significant events happening on the platform.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Events</CardTitle>
                    <CardDescription>
                        Events are listed in chronological order, with the most recent first.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[180px]">Timestamp</TableHead>
                                <TableHead className="w-[220px]">Event Type</TableHead>
                                <TableHead>Description</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                [...Array(10)].map((_, i) => (
                                    <TableRow key={i}>
                                        <TableCell><Skeleton className="h-6 w-36" /></TableCell>
                                        <TableCell><Skeleton className="h-6 w-48" /></TableCell>
                                        <TableCell><Skeleton className="h-6 w-full" /></TableCell>
                                    </TableRow>
                                ))
                            ) : events && events.length > 0 ? (
                                events.map((event) => (
                                    <TableRow key={event.id}>
                                        <TableCell>
                                            {event.timestamp ? 
                                                format(event.timestamp.toDate(), 'MMM d, yyyy, hh:mm a')
                                                : 'N/A'
                                            }
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <EventIcon eventType={event.type} />
                                                <span className="font-medium">{event.type}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <EventDescription event={event} />
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3} className="h-24 text-center">
                                        No events found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
