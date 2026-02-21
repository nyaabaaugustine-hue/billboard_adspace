import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const activities = [
    { text: 'New booking created for "Spintex Road Digital"', time: '2 minutes ago' },
    { text: 'New vendor registered: Apex Prints', time: '15 minutes ago' },
    { text: 'New user registered: Ama Serwaa', time: '1 hour ago' },
    { text: 'Billboard awaiting approval: "Adum Gantry"', time: '3 hours ago' },
    { text: 'Booking completed for "Accra Mall Unipole"', time: '5 hours ago' },
    { text: 'New review for "Creative Spark Designs"', time: '1 day ago' },
    { text: 'New user registered: Kofi Mensah', time: '2 days ago' },
]

export function RecentPlatformActivity({ className }: { className?: string }) {
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>Recent Platform Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-72">
                    <div className="space-y-4">
                        {activities.map((activity, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <div className="flex-1">
                                    <p className="text-sm font-medium">{activity.text}</p>
                                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}
