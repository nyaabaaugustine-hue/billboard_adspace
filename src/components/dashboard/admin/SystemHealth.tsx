import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Server, Database, HardDrive } from "lucide-react";

const healthMetrics = [
    {
        title: "API Response Time",
        value: "85ms",
        status: "Operational",
    },
    {
        title: "Server Uptime",
        value: "99.98%",
        status: "Operational",
    },
    {
        title: "Database Usage",
        value: "62%",
        status: "Operational",
    },
    {
        title: "Storage Used",
        value: "78%",
        status: "High",
    }
];

const getStatusBadge = (status: string) => {
    if (status === "Operational") {
        return <Badge className="border-green-300 bg-green-100 text-green-800 dark:border-green-700 dark:bg-green-900/50 dark:text-green-300">Operational</Badge>
    }
    return <Badge className="border-yellow-300 bg-yellow-100 text-yellow-800 dark:border-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300">{status}</Badge>
}

const icons: { [key: string]: React.ElementType } = {
    "API Response Time": Zap,
    "Server Uptime": Server,
    "Database Usage": Database,
    "Storage Used": HardDrive
};

export function SystemHealth() {
    return (
        <div>
            <h2 className="text-2xl font-bold tracking-tight mb-2">System Health & Performance</h2>
            <p className="text-muted-foreground mb-6">Live metrics for platform infrastructure.</p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {healthMetrics.map((metric) => {
                    const Icon = icons[metric.title];
                    return (
                        <Card key={metric.title}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                                <Icon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{metric.value}</div>
                                {getStatusBadge(metric.status)}
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    )
}
