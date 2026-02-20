'use client';
import { billboards, regions, vendors } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Copy, Facebook, Linkedin, Twitter, MapPin, Maximize, BarChart, CheckCircle, Layers, Sun, Star, Share2 } from "lucide-react";
import { SimilarBillboards } from "@/components/ai/SimilarBillboards";
import { BillboardDescription } from "@/components/ai/BillboardDescription";
import { BookingDialog } from "@/components/booking/BookingDialog";
import { useEffect, useState } from "react";

export default function BillboardDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const billboard = billboards.find((b) => b.id === params.id);
  const [trafficLabel, setTrafficLabel] = useState('Daily Traffic');

  useEffect(() => {
    if (billboard) {
      const label = (billboard.type === 'Unipole' || billboard.type === 'Gantry') && billboard.trafficEstimate > 150000 
        ? 'Highway Exposure' 
        : 'Daily Traffic';
      setTrafficLabel(label);
    }
  }, [billboard]);

  if (!billboard) {
    notFound();
  }

  const vendor = vendors.find((v) => v.id === billboard.vendorId);
  const regionName = regions.find(r => r.id === billboard.regionId)?.name;

  const descriptionContent =
    billboard.id === "bb-acc-011" ? (
      <div className="prose dark:prose-invert max-w-none text-muted-foreground">
        <p className="text-base md:text-lg">
          Reach thousands daily with a 25-sec ad on our digital screen at one of
          Legon’s busiest entrances.
        </p>
        <ul className="mt-4 space-y-2">
          <li>
            🎯{" "}
            <span className="font-semibold text-foreground">Audience:</span>{" "}
            Students, staff & visitors
          </li>
          <li>
            ⏱️ <span className="font-semibold text-foreground">Duration:</span> 25
            seconds
          </li>
          <li>
            🔁 <span className="font-semibold text-foreground">Loops:</span> Based
            on booked slots
          </li>
        </ul>
        <p className="mt-4 text-base md:text-lg font-semibold">
          High traffic. Youth focus. Maximum impact.
        </p>
      </div>
    ) : (
      <BillboardDescription
        billboard={{
          type: billboard.type,
          size: billboard.size,
          regionId: billboard.regionId,
          city: billboard.city,
          address: billboard.address,
          trafficEstimate: billboard.trafficEstimate,
          visibilityScore: billboard.visibilityScore,
        }}
      />
    );

  const getStatusBadge = () => {
    switch (billboard.status) {
      case 'On Hold':
        return <Badge className="border-yellow-300 bg-yellow-100 text-yellow-800 dark:border-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300">On Hold</Badge>;
      case 'Rented':
        return <Badge variant="secondary">Rented</Badge>;
      default:
        return <Badge className="border-green-300 bg-green-100 text-green-800 dark:border-green-700 dark:bg-green-900/50 dark:text-green-300">Available</Badge>;
    }
  };

  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <Button variant="ghost" asChild>
            <Link href="/billboards" className="flex items-center text-sm md:text-base">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Billboards
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
          <div className="lg:col-span-2">
            <Card className="overflow-hidden border shadow-sm">
              <div className="aspect-[4/3] relative">
                <Image
                  src={billboard.imageUrl}
                  alt={billboard.title}
                  fill
                  className="object-cover"
                  data-ai-hint="billboard image"
                  priority
                />
              </div>
            </Card>

            <div className="mt-8">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                  <div>
                    <Badge variant="secondary" className="text-xs md:text-sm">{billboard.type}</Badge>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mt-2">{billboard.title}</h1>
                    <p className="text-base md:text-lg text-muted-foreground mt-1">{billboard.address}, {billboard.city}, {regionName}</p>
                  </div>
                  <div className="flex gap-2 mt-4 md:mt-0">
                    <Button variant="outline" size="icon"><Share2 /></Button>
                    <BookingDialog billboard={billboard} />
                </div>
              </div>
            </div>
            
            <Separator className="my-8" />

            <div className="space-y-8">
                <div>
                    <h2 className="text-xl md:text-2xl font-bold">Description</h2>
                    <div className="mt-4">{descriptionContent}</div>
                </div>
                {vendor && (
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold">Vendor Information</h2>
                        <Card className="mt-4">
                            <CardHeader className="flex flex-row items-center gap-4">
                                <Image src={vendor.imageUrl} alt={vendor.name} width={64} height={64} className="rounded-md" data-ai-hint="company logo" />
                                <div>
                                    <CardTitle className="text-base md:text-xl">{vendor.name}</CardTitle>
                                    <CardDescription className="text-sm md:text-base">{vendor.serviceType}</CardDescription>
                                </div>
                            </CardHeader>
                        </Card>
                    </div>
                )}
            </div>

          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-lg">
              <CardHeader>
                <div className="space-y-2">
                  <h3 className="text-base md:text-lg font-semibold">Price</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl md:text-4xl font-bold text-price">
                      GH₵{billboard.pricePerMonth.toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                    </span>
                    <span className="text-sm md:text-base font-medium text-muted-foreground">/month</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <BookingDialog billboard={billboard} />
                <Separator className="my-6" />
                <h3 className="font-semibold mb-4 text-base md:text-lg">Billboard Details</h3>
                <div className="space-y-5 text-sm md:text-base">
                   <div className="flex items-start">
                    <CheckCircle className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                    <div>
                        <span className="font-semibold">Status</span>
                        <p className="text-muted-foreground">{billboard.status}</p>
                    </div>
                   </div>
                   <div className="flex items-start">
                    <Maximize className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                    <div>
                        <span className="font-semibold">Dimensions</span>
                        <p className="text-muted-foreground">{billboard.size}</p>
                    </div>
                   </div>
                   <div className="flex items-start">
                    <Layers className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                    <div>
                        <span className="font-semibold">Sides</span>
                        <p className="text-muted-foreground">{billboard.sides}</p>
                    </div>
                   </div>
                   <div className="flex items-start">
                    <Sun className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                    <div>
                        <span className="font-semibold">Lighting</span>
                        <p className="text-muted-foreground">{billboard.lighting ? 'Yes' : 'No'}</p>
                    </div>
                   </div>
                   <div className="flex items-start">
                    <BarChart className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                    <div>
                        <span className="font-semibold">{trafficLabel}</span>
                        <p className="text-muted-foreground">{billboard.trafficEstimate.toLocaleString()} est. daily views</p>
                    </div>
                   </div>
                   <div className="flex items-start">
                    <Star className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-primary fill-current" />
                    <div>
                        <span className="font-semibold">Visibility Score</span>
                        <p className="text-muted-foreground">{billboard.visibilityScore} / 10</p>
                    </div>
                   </div>
                </div>
                {billboard.isDigital && (
                     <>
                     <Separator className="my-6" />
                      <div className="space-y-2">
                        <h3 className="font-semibold text-base md:text-lg">Digital Screen Info</h3>
                        <div className="text-sm md:text-base text-muted-foreground">
                            <p>Slots Available: 10 of 10</p>
                            <p>Ad Duration: 25 seconds</p>
                        </div>
                      </div>
                   </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <SimilarBillboards currentBillboard={billboard} />
      </div>
    </div>
  );
}
