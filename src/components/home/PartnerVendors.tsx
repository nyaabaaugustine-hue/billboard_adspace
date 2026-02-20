
'use client';

import React from 'react';
import { vendors } from '@/lib/data';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export function PartnerVendors() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <div className="bg-secondary/50 py-20 sm:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Our Trusted Partners
        </h2>
        <p className="mt-4 text-center text-lg text-muted-foreground max-w-2xl mx-auto">
          We collaborate with the best printing, design, and installation companies in Ghana to ensure your campaigns are flawless.
        </p>
        <div className="mt-12">
          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-4">
              {vendors.map((vendor) => (
                <CarouselItem key={vendor.id} className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/5">
                  <div className="flex flex-col items-center justify-center p-4 aspect-[3/2] bg-card rounded-2xl border transition-shadow hover:shadow-lg">
                      <Image
                        src={vendor.imageUrl}
                        alt={vendor.name}
                        width={120}
                        height={80}
                        className="object-contain"
                        data-ai-hint="company logo"
                      />
                      <p className="mt-4 text-center font-semibold text-sm text-foreground">{vendor.name}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      </div>
    </div>
  );
}
