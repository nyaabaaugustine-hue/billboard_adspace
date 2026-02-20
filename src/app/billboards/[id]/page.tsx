import { billboards } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Maximize, BarChart, Star } from "lucide-react";
import { BillboardDescription } from "@/components/ai/BillboardDescription";
import { SimilarBillboards } from "@/components/ai/SimilarBillboards";

export default function BillboardDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const billboard = billboards.find((b) => b.id === params.id);

  if (!billboard) {
    notFound();
  }

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-4">
            <h1 className="font-bold text-2xl">{billboard.title}</h1>
            <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{billboard.visibilityScore}</span>
                </div>
                <span>·</span>
                 <p className="underline">
                  {billboard.address}, {billboard.city}
                </p>
            </div>
        </div>

        <div className="h-96 w-full overflow-hidden rounded-lg">
            <Image
                src={billboard.imageUrl}
                alt={billboard.title}
                width={1200}
                height={600}
                className="h-full w-full object-cover object-center"
                data-ai-hint="billboard image"
            />
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 mt-12">
          <div className="lg:col-span-2">
            <h2 className="font-semibold text-xl mb-4">Description</h2>
             <BillboardDescription billboard={{
                type: billboard.type,
                size: billboard.size,
                regionId: billboard.regionId,
                city: billboard.city,
                address: billboard.address,
                trafficEstimate: billboard.trafficEstimate,
                visibilityScore: billboard.visibilityScore,
             }} />
          </div>
          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-lg rounded-xl border-2 p-4">
              <CardContent className="p-2">
                 <div className="flex justify-between items-baseline mb-6">
                    <p>
                        <span className="font-bold text-2xl">
                        GHS {billboard.pricePerMonth.toLocaleString()}
                        </span>
                        <span className="text-muted-foreground"> / month</span>
                    </p>
                     <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{billboard.visibilityScore}</span>
                    </div>
                 </div>

                <div className="space-y-4 mb-6">
                   <div className="flex items-center gap-4">
                    <Maximize className="h-6 w-6 text-foreground" />
                    <div>
                      <p className="font-semibold">{billboard.size}</p>
                      <p className="text-sm text-muted-foreground">Size</p>
                    </div>
                  </div>
                   <div className="flex items-center gap-4">
                    <BarChart className="h-6 w-6 text-foreground" />
                    <div>
                      <p className="font-semibold">
                        {billboard.trafficEstimate.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Daily Traffic Est.
                      </p>
                    </div>
                  </div>
                </div>

                <Button size="lg" className="w-full text-lg h-12 bg-primary hover:bg-primary/90">
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        <SimilarBillboards currentBillboard={billboard} />
      </div>
    </div>
  );
}
