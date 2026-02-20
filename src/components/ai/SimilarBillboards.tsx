'use client';

import { useEffect, useState } from 'react';
import { aiSimilarBillboardRecommender, type SimilarBillboardRecommenderOutput } from '@/ai/flows/ai-similar-billboard-recommender-flow';
import { BillboardCard } from '@/components/BillboardCard';
import type { Billboard, BillboardType } from '@/lib/types';
import { Skeleton } from '../ui/skeleton';

interface SimilarBillboardsProps {
  currentBillboard: Billboard;
}

type RecommendedBillboard = SimilarBillboardRecommenderOutput['recommendations'][0];

export function SimilarBillboards({ currentBillboard }: SimilarBillboardsProps) {
  const [recommendations, setRecommendations] = useState<RecommendedBillboard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
        // The AI can sometimes hallucinate and not return an array.
        if (result && Array.isArray(result.recommendations)) {
          setRecommendations(result.recommendations);
        }
      } catch (error) {
        console.error('Error fetching similar billboards:', error);
        setRecommendations([]);
      } finally {
        setLoading(false);
      }
    }
    getRecommendations();
  }, [currentBillboard]);
  
  const toBillboardType = (rec: RecommendedBillboard): Billboard => {
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
        regionId: currentBillboard.regionId, // Use current billboard's region
        isDigital: rec.type === 'Digital LED',
        isActive: true,
        status: 'Available',
        sides: 1,
        lighting: rec.type === 'Digital LED',
        trafficEstimate: Math.floor(Math.random() * 50000) + 50000, // random dummy data
        visibilityScore: Math.floor(Math.random() * 3) + 7, // random dummy data between 7-9
        createdAt: new Date().toISOString(),
        imageUrl: `https://picsum.photos/seed/${rec.id}/600/400`,
    }
  }

  return (
    <div className="mt-16">
      <h2 className="mb-8 text-2xl font-bold tracking-tight text-foreground">
        Similar Billboards
      </h2>
      {loading ? (
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
      ) : recommendations.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((rec) => (
            <BillboardCard key={rec.id} billboard={toBillboardType(rec)} />
          ))}
        </div>
      ) : (
        <div className="flex h-48 items-center justify-center rounded-2xl border bg-card">
          <p className="text-muted-foreground">
            No similar billboards found at the moment.
          </p>
        </div>
      )}
    </div>
  );
}
