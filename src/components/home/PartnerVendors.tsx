'use client';

import React from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useCollection, useFirestore } from '@/firebase';
import { collection } from 'firebase/firestore';
import type { Vendor } from '@/lib/types';
import { Skeleton } from '../ui/skeleton';

export function PartnerVendors() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  const firestore = useFirestore();
  const vendorsCol = collection(firestore, 'vendors');
  const { data: vendors, loading } = useCollection<Vendor>(vendorsCol);

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
          {loading ? (
            <div className="flex gap-4 overflow-hidden">
                {[...Array(5)].map((_,i) => (
                    <div key={i} className="flex flex-col items-center justify-center p-4 aspect-[3/2] bg-card rounded-md border basis-1/2 md:basis-1/3 lg:basis-1/5 shrink-0">
                        <Skeleton className="h-20 w-32" />
                        <Skeleton className="h-4 w-24 mt-4" />
                    </div>
                ))}
            </div>
          ) : (
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
                {(vendors || []).map((vendor) => (
                  <CarouselItem key={vendor.id} className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/5">
                    <div className="flex flex-col items-center justify-center p-4 aspect-[3/2] bg-card rounded-md border transition-shadow hover:shadow-lg">
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
          )}
        </div>
      </div>
    </div>
  );
}
