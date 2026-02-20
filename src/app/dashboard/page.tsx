import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Briefcase, User } from "lucide-react";
import Link from "next/link";

const dashboards = [
    {
        title: "Admin Dashboard",
        href: "/dashboard/admin",
        icon: Shield,
        description: "Oversee platform performance, manage users, and view analytics."
    },
    {
        title: "Vendor Dashboard",
        href: "/dashboard/vendor",
        icon: Briefcase,
        description: "Manage your billboard listings, track earnings, and view bookings."
    },
    {
        title: "User Dashboard",
        href: "/dashboard/user",
        icon: User,
        description: "Track your campaigns, manage bookings, and view payment history."
    }
]

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="text-center">
            <h1 className="text-4xl font-bold">Select a Dashboard View</h1>
            <p className="mt-2 text-lg text-muted-foreground">
                Each dashboard is tailored to a specific role.
            </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {dashboards.map((dash) => (
                 <Link href={dash.href} key={dash.href} className="block">
                    <Card className="hover:border-primary hover:shadow-lg transition-all duration-200 h-full">
                        <CardHeader className="flex flex-row items-center gap-4">
                           <dash.icon className="h-8 w-8 text-primary" />
                            <CardTitle className="text-xl">{dash.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{dash.description}</p>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    </div>
  );
}
