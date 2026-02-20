'use client';
import { billboards, regions, vendors } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Copy, Facebook, Linkedin, Twitter, MapPin, Maximize, BarChart, CheckCircle, Layers, Sun, Star } from "lucide-react";
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
      <div>
        <p className="text-lg text-muted-foreground">
          Reach thousands daily with a 25-sec ad on our digital screen at one of
          Legon’s busiest entrances.
        </p>
        <ul className="mt-4 space-y-2 text-muted-foreground">
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
        <p className="mt-4 text-lg font-semibold">
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
        return <Badge className="border-green-300 bg-green-100 text-green-800 dark:border-green-700 dark:bg-green-900/50 dark:text-green-300">Available for Booking</Badge>;
    }
  };

  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" asChild className="px-0 hover:bg-transparent">
            <Link href="/" className="flex items-center text-base">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
          <div className="lg:col-span-2">
            <div className="mb-4 lg:hidden">
              <h1 className="text-3xl font-extrabold">{billboard.title}</h1>
              <div className="mt-4 flex gap-2">
                <BookingDialog billboard={billboard} />
                <Button className="w-full" size="lg" variant="outline">
                  Browse More
                </Button>
              </div>
            </div>

            <Card className="overflow-hidden rounded-2xl">
              <Image
                src={billboard.imageUrl}
                alt={billboard.title}
                width={800}
                height={600}
                className="h-auto w-full object-cover"
                data-ai-hint="billboard image"
                priority
              />
            </Card>

            <div className="mt-8 hidden justify-between lg:flex">
              <h1 className="text-4xl font-extrabold">{billboard.title}</h1>
              <div className="flex gap-2">
                <BookingDialog billboard={billboard} />
                <Button size="lg" variant="outline">
                  Browse More
                </Button>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-bold">Description</h2>
              <div className="mt-4">{descriptionContent}</div>
            </div>

            <Separator className="my-8" />

            <div>
              <h2 className="text-2xl font-bold">Share this Billboard</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button variant="outline">
                  <Copy className="mr-2" /> Copy Link
                </Button>
                <Button variant="outline">
                  <Facebook className="mr-2" /> Facebook
                </Button>
                <Button variant="outline">
                  <Twitter className="mr-2" /> Twitter
                </Button>
                <Button variant="outline">
                  <Linkedin className="mr-2" /> LinkedIn
                </Button>
                <Button variant="outline">
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24 rounded-2xl shadow-lg">
              <CardHeader>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-sm">
                    {billboard.type}
                  </Badge>
                  {getStatusBadge()}
                </div>
                <CardTitle className="pt-4 text-2xl">{billboard.title}</CardTitle>
                {vendor && (
                  <p className="text-muted-foreground">
                    by{" "}
                    <Link href="#" className="font-semibold text-primary hover:underline">
                      {vendor.name}
                    </Link>
                  </p>
                )}
              </CardHeader>
              <CardContent>
                <Separator className="mb-6" />
                <div className="space-y-5 text-base">
                   <div className="flex items-start">
                    <CheckCircle className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                    <div>
                        <span className="font-semibold">Booking Status</span>
                        <p className="text-muted-foreground">{billboard.status}</p>
                    </div>
                   </div>
                   <div className="flex items-start">
                    <MapPin className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                    <div>
                        <span className="font-semibold">Location</span>
                        <p className="text-muted-foreground">{billboard.address}, {billboard.city}, {regionName}</p>
                    </div>
                   </div>
                   <div className="flex items-start">
                    <Maximize className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                    <div>
                        <span className="font-semibold">Dimensions</span>
                        <p className="text-muted-foreground">{billboard.size} (landscape)</p>
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
                <Separator className="my-6" />
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Price</h3>
                  <p className="text-3xl font-bold text-primary">
                    GH₵ {billboard.pricePerMonth.toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2})}/month
                  </p>
                </div>
                {billboard.isDigital && (
                     <>
                     <Separator className="my-6" />
                     <div className="space-y-2">
                       <h3 className="text-lg font-semibold">Availability</h3>
                       <p className="text-base text-muted-foreground">
                         10 of 10 slots available
                       </p>
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
