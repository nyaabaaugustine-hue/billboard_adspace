import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { billboards } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Calendar, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const campaigns = [
    {
        id: 'cam-01',
        title: 'Q2 Brand Awareness Push',
        status: 'Active',
        progress: 75,
        startDate: 'April 1, 2024',
        endDate: 'June 30, 2024',
        billboards: [billboards[0], billboards[2]]
    },
    {
        id: 'cam-02',
        title: 'Takoradi Market Launch',
        status: 'Upcoming',
        progress: 0,
        startDate: 'July 15, 2024',
        endDate: 'August 15, 2024',
        billboards: [billboards[4]]
    }
]

export function ActiveCampaigns({ className }: { className?: string }) {
    return (
        <Card className={cn(className)}>
            <CardHeader>
                <CardTitle>Active Campaigns</CardTitle>
                <CardDescription>An overview of your current and upcoming campaigns.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {campaigns.map(campaign => (
                    <div key={campaign.id} className="group">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold group-hover:text-primary">{campaign.title}</h3>
                            <Badge variant={campaign.status === 'Active' ? 'default' : 'secondary'}>{campaign.status}</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                            <Calendar className="h-4 w-4" />
                            <span>{campaign.startDate} - {campaign.endDate}</span>
                        </div>
                        <Progress value={campaign.progress} className="h-2 mb-3" />
                        
                        <div className="text-sm font-medium mb-2">Billboards in this campaign:</div>
                        <div className="flex space-x-4 overflow-x-auto pb-2">
                            {campaign.billboards.map(b => (
                                <Link href={`/billboards/${b.id}`} key={b.id} className="block shrink-0">
                                    <div className="w-48">
                                        <div className="relative aspect-video w-full rounded-md overflow-hidden bg-muted">
                                            <Image src={b.imageUrl} alt={b.title} fill className="object-cover" data-ai-hint="billboard image" />
                                        </div>
                                        <p className="text-xs font-medium mt-1 truncate">{b.title}</p>
                                        <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" /> {b.city}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
