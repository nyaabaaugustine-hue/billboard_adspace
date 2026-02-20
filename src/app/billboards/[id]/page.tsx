import { billboards } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Maximize, DollarSign, BarChart, Eye } from "lucide-react";

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
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <div className="relative h-96 w-full">
                <Image
                  src={billboard.imageUrl}
                  alt={billboard.title}
                  fill
                  style={{ objectFit: "cover" }}
                  data-ai-hint="billboard image"
                />
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-4xl">
                  {billboard.title}
                </CardTitle>
                <CardDescription className="flex items-center gap-2 pt-2">
                  <MapPin className="h-4 w-4" />
                  {billboard.address}, {billboard.city}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <h3 className="mb-4 font-headline text-2xl">Description</h3>
                <p className="max-w-prose text-lg">
                  This is a placeholder description. With our AI tools, a
                  compelling and detailed description will be generated here to
                  highlight the unique selling points and appeal to potential
                  advertisers, focusing on the billboard's prime location, high
                  traffic, and excellent visibility.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="font-headline text-3xl">
                  Booking Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <DollarSign className="h-6 w-6 text-accent" />
                    <div>
                      <p className="font-bold">
                        GHS {billboard.pricePerMonth.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        per month
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Maximize className="h-6 w-6 text-accent" />
                    <div>
                      <p className="font-bold">{billboard.size}</p>
                      <p className="text-sm text-muted-foreground">Size</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <BarChart className="h-6 w-6 text-accent" />
                    <div>
                      <p className="font-bold">
                        {billboard.trafficEstimate.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Daily Traffic Est.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Eye className="h-6 w-6 text-accent" />
                    <div>
                      <p className="font-bold">{billboard.visibilityScore}/10</p>
                      <p className="text-sm text-muted-foreground">
                        Visibility Score
                      </p>
                    </div>
                  </div>
                </div>

                <Button size="lg" className="w-full text-lg">
                  Book Now
                </Button>
                <Button variant="outline" className="w-full">
                  Contact via WhatsApp
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
