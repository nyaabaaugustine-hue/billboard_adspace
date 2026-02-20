import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const locations = [
    { name: "Greater Accra", percentage: 45 },
    { name: "Ashanti", percentage: 22 },
    { name: "Western", percentage: 12 },
    { name: "Northern", percentage: 9 },
    { name: "Other", percentage: 12 },
]

export function UserLocationBreakdown({ className }: { className?: string }) {
  return (
    <Card className={className}>
        <CardHeader>
            <CardTitle>User Location Breakdown</CardTitle>
            <CardDescription>Geographic distribution of users in Ghana.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {locations.map(location => (
                <div key={location.name} className="space-y-1">
                    <div className="flex justify-between text-sm">
                        <span className="font-medium">{location.name}</span>
                        <span className="text-muted-foreground">{location.percentage}%</span>
                    </div>
                    <Progress value={location.percentage} className="h-2" />
                </div>
            ))}
        </CardContent>
    </Card>
  )
}
