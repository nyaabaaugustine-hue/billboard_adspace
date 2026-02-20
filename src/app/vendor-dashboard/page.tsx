import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { VendorStatCards } from "@/components/vendor-dashboard/VendorStatCards";
import { VendorBillboardsTable } from "@/components/vendor-dashboard/VendorBillboardsTable";
import { RevenueChart } from "@/components/dashboard/RevenueChart";

export default function VendorDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">
            Vendor Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome, Apex Prints! Manage your listings and view your performance.
          </p>
        </div>
        <div className="flex items-center space-x-2">
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Billboard
            </Button>
        </div>
      </div>

      <VendorStatCards />

      <div className="grid grid-cols-12 gap-6">
        <RevenueChart className="col-span-12 lg:col-span-7" />
        <VendorBillboardsTable className="col-span-12 lg:col-span-5" />
      </div>
    </div>
  );
}
