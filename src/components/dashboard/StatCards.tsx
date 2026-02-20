import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign, Megaphone, Briefcase, Users } from "lucide-react";

const stats = [
  {
    title: "Total Revenue",
    value: "GH₵ 1,250,000",
    change: "+12.5% from last month",
    icon: DollarSign,
  },
  {
    title: "Active Bookings",
    value: "84",
    change: "+2 since yesterday",
    icon: Briefcase,
  },
  {
    title: "Active Billboards",
    value: "152",
    change: "3 awaiting approval",
    icon: Megaphone,
  },
  {
    title: "New Vendors",
    value: "5",
    change: "+2 this week",
    icon: Users,
  },
];

export function StatCards() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
