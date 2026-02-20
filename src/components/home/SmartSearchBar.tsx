import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Calendar, Building, Search } from "lucide-react";

export function SmartSearchBar() {
  return (
    <div className="mt-4 w-full max-w-3xl">
      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-px rounded-xl bg-background/80 backdrop-blur-md p-2 shadow-2xl border border-border">
        <div className="relative col-span-1 md:col-span-2">
           <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
           <Input
            type="text"
            placeholder="Search by city or region..."
            className="h-14 w-full rounded-l-xl bg-transparent pl-12 text-base border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        
        <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
                type="text"
                placeholder="Date"
                className="h-14 w-full bg-transparent pl-12 text-base border-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none"
            />
        </div>

        <div className="flex items-center justify-between rounded-r-xl pl-4 bg-transparent h-14">
            <div className="relative flex-grow">
                <Building className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Type"
                    className="h-14 w-full bg-transparent pl-8 text-base border-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none"
                />
            </div>
            <Button type="submit" size="icon" className="rounded-lg bg-primary h-12 w-12 shrink-0">
                <Search className="h-6 w-6 text-primary-foreground" />
            </Button>
        </div>
      </div>
    </div>
  );
}
