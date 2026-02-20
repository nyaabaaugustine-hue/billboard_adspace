import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { vendors, billboards } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "../../ui/badge";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function TopPerformers({ className }: { className?: string }) {
  const topVendors = vendors.slice(0, 2);
  const topBillboards = billboards.slice(0, 2);

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Top Performers</CardTitle>
        <CardDescription>Your top-performing vendors and billboards.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Top Vendors</h3>
          <div className="space-y-4">
            {topVendors.map((vendor) => (
              <div key={vendor.id} className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={vendor.imageUrl} alt={vendor.name} data-ai-hint="company logo"/>
                  <AvatarFallback>{vendor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">{vendor.name}</p>
                  <p className="text-sm text-muted-foreground">{vendor.region}</p>
                </div>
                <div className="ml-auto font-medium flex items-center gap-1 text-sm">+GH₵ 12k <ArrowUpRight className="h-4 w-4 text-green-500" /></div>
              </div>
            ))}
          </div>
        </div>
        <div>
           <h3 className="text-sm font-medium text-muted-foreground mb-3">High-Performing Boards</h3>
           <div className="space-y-4">
            {topBillboards.map((billboard) => (
              <div key={billboard.id} className="flex items-center">
                 <div className="relative w-12 h-9 rounded-md overflow-hidden mr-4 bg-muted">
                    <Image src={billboard.imageUrl} alt={billboard.title} fill className="object-cover" data-ai-hint="billboard image" />
                 </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none truncate">{billboard.title}</p>
                  <p className="text-sm text-muted-foreground">{billboard.city}</p>
                </div>
                <div className="ml-auto">
                    <Badge variant="secondary">{(Math.floor(Math.random() * 10) + 1)} Bookings</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
