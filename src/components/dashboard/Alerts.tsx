import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AlertTriangle, BadgeCheck, Zap } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

const alerts = [
  {
    icon: AlertTriangle,
    iconClass: "text-destructive",
    title: "Booking Overlap",
    description: "BB-ACC-003 has overlapping booking requests for June.",
    action: "Resolve",
  },
  {
    icon: BadgeCheck,
    iconClass: "text-blue-500",
    title: "New Vendor Approval",
    description: "'SignaFlex Ghana' is awaiting verification.",
    action: "Review",
  },
  {
    icon: Zap,
    iconClass: "text-primary",
    title: "High Demand Zone",
    description: "Osu, Accra is trending. Consider increasing prices.",
    action: "Analyze",
  }
]

export function Alerts({ className }: { className?: string }) {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Alerts & Notifications</CardTitle>
        <CardDescription>
          Priority items that require your attention.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert, index) => (
          <div key={index} className="flex items-start gap-4">
            <alert.icon className={`h-5 w-5 mt-1 ${alert.iconClass}`} />
            <div className="flex-1">
              <p className="font-semibold">{alert.title}</p>
              <p className="text-sm text-muted-foreground">{alert.description}</p>
            </div>
            <Button variant="outline" size="sm">{alert.action}</Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
