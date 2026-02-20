import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Eye, Pencil, FileText, Wallet } from "lucide-react";

const insights = [
    { title: "Most Applied Job", value: "Senior React Developer", description: "342 Applications", icon: Pencil },
    { title: "Most Viewed Job", value: "Full-stack Engineer", description: "2.1k Views", icon: Eye },
    { title: "Top Category", value: "Software Development", description: "450 Listings", icon: FileText },
    { title: "Average Salary", value: "GH₵115k/year", description: "Across all jobs", icon: Wallet },
]

export function JobMarketInsights({ className }: { className?: string }) {
  return (
    <Card className={className}>
        <CardHeader>
            <CardTitle>Job Market Insights</CardTitle>
            <CardDescription>Key statistics from your job board.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insights.map((insight) => (
                <Card key={insight.title}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">{insight.title}</CardTitle>
                        <insight.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg font-bold">{insight.value}</p>
                        <p className="text-xs text-muted-foreground">{insight.description}</p>
                    </CardContent>
                </Card>
            ))}
        </CardContent>
    </Card>
  )
}
