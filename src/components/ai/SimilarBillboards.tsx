'use client';

import React, { useEffect, useState } from 'react';
import { aiSimilarBillboardRecommender } from '@/ai/flows/ai-similar-billboard-recommender-flow';
import type { Billboard, BillboardType } from '@/lib/types';
import { useCollection, useFirestore } from '@/firebase';
import { collection, query, where, limit } from 'firebase/firestore';
import { Skeleton } from '../ui/skeleton';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { SimilarBillboardCard } from './SimilarBillboardCard';

interface SimilarBillboardsProps {
  currentBillboard: Billboard;
}

export function SimilarBillboards({ currentBillboard }: SimilarBillboardsProps) {
  const [recommendations, setRecommendations] = useState<Billboard[]>([]);
  const [loading, setLoading] = useState(true);

  const firestore = useFirestore();
  const billboardsCol = collection(firestore, 'billboards');
  const fallbackQuery = query(billboardsCol, where('city', '==', currentBillboard.city), limit(10));
  const { data: fallbackBillboardsData, loading: fallbackLoading } = useCollection<Billboard>(fallbackQuery);

  const plugin = React.useRef(
    Autoplay({ delay: 7000, stopOnInteraction: true })
  );

  useEffect(() => {
    if (fallbackLoading) return;

    async function getRecommendations() {
      try {
        setLoading(true);
        const result = await aiSimilarBillboardRecommender({
          currentBillboard: {
            id: currentBillboard.id,
            title: currentBillboard.title,
            type: currentBillboard.type,
            size: currentBillboard.size,
            pricePerMonth: currentBillboard.pricePerMonth,
            city: currentBillboard.city,
            address: currentBillboard.address,
            latitude: currentBillboard.latitude,
            longitude: currentBillboard.longitude,
          },
        });
        
        if (result && Array.isArray(result.recommendations) && result.recommendations.length > 0) {
            const aiBillboards = result.recommendations.map((rec): Billboard => {
                const randomVendorId = 'ven-00' + (Math.floor(Math.random() * 4) + 1);
                return {
                    id: rec.id,
                    title: rec.title,
                    type: rec.type as BillboardType,
                    size: rec.size,
                    pricePerMonth: rec.pricePerMonth,
                    city: rec.city,
                    address: rec.address,
                    latitude: rec.latitude,
                    longitude: rec.longitude,
                    regionId: currentBillboard.regionId,
                    isDigital: rec.type === 'Digital LED',
                    isActive: true,
                    status: 'Available',
                    sides: 1,
                    lighting: rec.type === 'Digital LED',
                    trafficEstimate: Math.floor(Math.random() * 50000) + 50000,
                    visibilityScore: Math.floor(Math.random() * 3) + 7,
                    createdAt: new Date().toISOString(),
                    imageUrl: `https://picsum.photos/seed/${rec.id}/600/400`,
                    vendorId: randomVendorId,
                };
            });
            setRecommendations(aiBillboards);
        } else {
            if (fallbackBillboardsData) {
                const fallback = fallbackBillboardsData
                  .filter(b => b.id !== currentBillboard.id)
                  .sort(() => 0.5 - Math.random())
                  .slice(0, 5);
                setRecommendations(fallback);
            }
        }
      } catch (error) {
        console.error('Error fetching similar billboards, using fallback:', error);
         if (fallbackBillboardsData) {
            const fallback = fallbackBillboardsData
              .filter(b => b.id !== currentBillboard.id)
              .sort(() => 0.5 - Math.random())
              .slice(0, 5);
            setRecommendations(fallback);
        }
      } finally {
        setLoading(false);
      }
    }
    
    getRecommendations();

  }, [currentBillboard, fallbackBillboardsData, fallbackLoading]);

  const isLoading = loading || fallbackLoading;

  if (isLoading) {
    return (
      <div className="mt-16">
        <h2 className="mb-8 text-2xl font-bold tracking-tight text-foreground">
          Similar Billboards
        </h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-[4/3] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-16">
      <h2 className="mb-8 text-2xl font-bold tracking-tight text-foreground">
        Similar Billboards
      </h2>
      {recommendations.length > 0 ? (
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
            {recommendations.map((billboard) => (
              <CarouselItem key={billboard.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                 <div className="p-1 h-full">
                    <SimilarBillboardCard billboard={billboard} />
                 </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      ) : (
        <p className="text-muted-foreground">No similar billboards found at the moment.</p>
      )}
    </div>
  );
}
