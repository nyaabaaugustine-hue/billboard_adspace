'use client';

import { useEffect, useState } from 'react';
import { generateBillboardDescription, type GenerateBillboardDescriptionInput } from '@/ai/flows/ai-billboard-description-generator';
import { Skeleton } from '@/components/ui/skeleton';
import { regions } from '@/lib/data';
import type { Billboard } from '@/lib/types';

interface BillboardDescriptionProps {
  billboard: Pick<Billboard, 'type' | 'size' | 'regionId' | 'city' | 'address' | 'trafficEstimate' | 'visibilityScore'>;
}

function getTrafficEstimateCategory(estimate: number): string {
    if (estimate > 150000) return "high";
    if (estimate > 80000) return "moderate";
    return "low";
}

function getVisibilityScoreCategory(score: number): string {
    if (score > 7) return "excellent";
    if (score > 5) return "good";
    return "fair";
}

export function BillboardDescription({ billboard }: BillboardDescriptionProps) {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function generateDescription() {
      try {
        setLoading(true);
        const regionName = regions.find(r => r.id === billboard.regionId)?.name || 'Unknown Region';
        const input: GenerateBillboardDescriptionInput = {
          type: billboard.type,
          size: billboard.size,
          region: regionName,
          city: billboard.city,
          address: billboard.address,
          trafficEstimate: getTrafficEstimateCategory(billboard.trafficEstimate),
          visibilityScore: getVisibilityScoreCategory(billboard.visibilityScore),
        }
        const desc = await generateBillboardDescription(input);
        setDescription(desc);
      } catch (error) {
        console.error('Error generating billboard description:', error);
        setDescription('This is a prime advertising location with high visibility and significant traffic, offering a great opportunity for your brand to be seen. Contact us for more details.');
      } finally {
        setLoading(false);
      }
    }
    generateDescription();
  }, [billboard]);

  if (loading) {
    return (
      <div className="space-y-2 max-w-prose">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    );
  }

  return <p className="max-w-prose text-base">{description}</p>;
}
