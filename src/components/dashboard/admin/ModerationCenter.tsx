import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const items = [
    { title: "Jobs pending approval", count: 5 },
    { title: "Companies pending verification", count: 2 },
    { title: "Reported listings", count: 1 },
]

export function ModerationCenter({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Moderation Center</CardTitle>
        <CardDescription>Quick actions for platform integrity.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.count} items</p>
                </div>
                <Button variant="outline" size="sm">View</Button>
            </div>
        ))}
      </CardContent>
    </Card>
  )
}
