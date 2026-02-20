'use client';
import { billboards } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Maximize, BarChart, Star, Calendar as CalendarIcon, Users } from "lucide-react";
import { BillboardDescription } from "@/components/ai/BillboardDescription";
import { SimilarBillboards } from "@/components/ai/SimilarBillboards";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import { cn } from "@/lib/utils";


export default function BillboardDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const billboard = billboards.find((b) => b.id === params.id);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 30),
  })

  if (!billboard) {
    notFound();
  }
  
  const duration = date?.to && date?.from ? (date.to.getTime() - date.from.getTime()) / (1000 * 3600 * 24 * 30) : 1;
  const totalPrice = duration > 0 ? billboard.pricePerMonth * Math.round(duration) : billboard.pricePerMonth;


  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-4">
            <h1 className="font-bold text-4xl">{billboard.title}</h1>
            <div className="flex items-center gap-4 text-sm mt-2">
                 <p className="underline">
                  {billboard.address}, {billboard.city}
                </p>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-2 h-[500px] overflow-hidden rounded-2xl">
            <div className="col-span-1 h-full">
                <Image
                    src={billboard.imageUrl}
                    alt={billboard.title}
                    width={800}
                    height={1000}
                    className="h-full w-full object-cover object-center"
                    data-ai-hint="billboard image"
                />
            </div>
            <div className="col-span-1 grid grid-cols-2 gap-2 h-full">
                 <Image
                    src={`https://picsum.photos/seed/${billboard.id}-2/400/400`}
                    alt={billboard.title}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover object-center"
                    data-ai-hint="billboard lifestyle"
                />
                 <Image
                    src={`https://picsum.photos/seed/${billboard.id}-3/400/400`}
                    alt={billboard.title}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover object-center"
                    data-ai-hint="billboard detail"
                />
                 <Image
                    src={`https://picsum.photos/seed/${billboard.id}-4/400/400`}
                    alt={billboard.title}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover object-center"
                    data-ai-hint="billboard location"
                />
                 <Image
                    src={`https://picsum.photos/seed/${billboard.id}-5/400/400`}
                    alt={billboard.title}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover object-center"
                    data-ai-hint="billboard angle"
                />
            </div>
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-3 mt-16">
          <div className="lg:col-span-2">
            <h2 className="font-semibold text-2xl mb-4">Prime Advertising Space in {billboard.city}</h2>
             <BillboardDescription billboard={{
                type: billboard.type,
                size: billboard.size,
                regionId: billboard.regionId,
                city: billboard.city,
                address: billboard.address,
                trafficEstimate: billboard.trafficEstimate,
                visibilityScore: billboard.visibilityScore,
             }} />
             
            <div className="mt-8 border-t border-border pt-8">
                <h3 className="font-semibold text-xl mb-6">Key Features</h3>
                 <div className="grid grid-cols-2 gap-6">
                   <div className="flex items-center gap-4">
                    <Maximize className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-semibold">{billboard.size}</p>
                      <p className="text-sm text-muted-foreground">Impressive Dimensions</p>
                    </div>
                  </div>
                   <div className="flex items-center gap-4">
                    <BarChart className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-semibold">
                        {billboard.trafficEstimate.toLocaleString()} Daily Views
                      </p>
                      <p className="text-sm text-muted-foreground">
                        High Traffic Area
                      </p>
                    </div>
                  </div>
                   <div className="flex items-center gap-4">
                    <Star className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-semibold">
                        {billboard.visibilityScore}/10 Visibility
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Excellent Exposure
                      </p>
                    </div>
                  </div>
                   <div className="flex items-center gap-4">
                    <Users className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-semibold">
                        Diverse Audience
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Commuters, Shoppers, Tourists
                      </p>
                    </div>
                  </div>
                </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-lg rounded-2xl border-border p-6 bg-card">
              <CardContent className="p-0">
                 <div className="flex justify-between items-baseline mb-6">
                    <p>
                        <span className="font-bold text-3xl">
                        GHS {billboard.pricePerMonth.toLocaleString()}
                        </span>
                        <span className="text-muted-foreground"> / month</span>
                    </p>
                     <div className="flex items-center gap-1 text-amber-400">
                        <Star className="h-5 w-5 fill-amber-400" />
                        <span className="font-bold text-lg">{billboard.visibilityScore}</span>
                    </div>
                 </div>

                <div className="grid gap-4 mb-6">
                    <Popover>
                        <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                            "w-full justify-start text-left font-normal h-12 text-base",
                            !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date?.from ? (
                            date.to ? (
                                <>
                                {format(date.from, "LLL dd, y")} -{" "}
                                {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                            ) : (
                            <span>Pick a date range</span>
                            )}
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={setDate}
                            numberOfMonths={2}
                        />
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="border-t border-border pt-4 space-y-3 mb-6">
                    <div className="flex justify-between">
                        <p className="underline">GHS {billboard.pricePerMonth.toLocaleString()} x {Math.round(duration)} months</p>
                        <p>GHS {totalPrice.toLocaleString()}</p>
                    </div>
                     <div className="flex justify-between">
                        <p className="underline">Platform fee</p>
                        <p>GHS 500</p>
                    </div>
                </div>
                 <div className="flex justify-between font-bold text-lg border-t border-border pt-4">
                        <p>Total</p>
                        <p>GHS {(totalPrice + 500).toLocaleString()}</p>
                    </div>


                <Button size="lg" className="w-full text-lg h-14 bg-primary hover:bg-primary/90 mt-6 rounded-xl">
                  Reserve Now
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
