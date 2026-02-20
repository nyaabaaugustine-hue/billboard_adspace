import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const activities = [
    { text: 'New job posted: "Senior Backend Dev"', time: '2 minutes ago' },
    { text: 'New company registered: DevWorks Ltd', time: '15 minutes ago' },
    { text: 'New employer subscription: Pro Plan', time: '1 hour ago' },
    { text: 'Job awaiting moderation: "UI/UX Intern"', time: '3 hours ago' },
    { text: 'New user registered: Ama Serwaa', time: '5 hours ago' },
    { text: 'Job expired: "Marketing Manager"', time: '1 day ago' },
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
