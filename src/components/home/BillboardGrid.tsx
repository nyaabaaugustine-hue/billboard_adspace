'use client';

import { useState, useMemo } from 'react';
import type { Billboard } from '@/lib/types';
import { BillboardCard } from '@/components/BillboardCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface BillboardGridProps {
  billboards: Billboard[];
  title?: string;
}

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'visibility' | 'traffic';

export function BillboardGrid({ billboards, title = 'Featured Billboards' }: BillboardGridProps) {
  const [sortOption, setSortOption] = useState<SortOption>('default');

  const sortedBillboards = useMemo(() => {
    const sorted = [...billboards];
    switch (sortOption) {
      case 'price-asc':
        sorted.sort((a, b) => a.pricePerMonth - b.pricePerMonth);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.pricePerMonth - a.pricePerMonth);
        break;
      case 'visibility':
        sorted.sort((a, b) => b.visibilityScore - a.visibilityScore);
        break;
      case 'traffic':
        sorted.sort((a, b) => b.trafficEstimate - a.trafficEstimate);
        break;
      default:
        // No sorting for 'default' to keep original order
        break;
    }
    return sorted;
  }, [billboards, sortOption]);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight">
          {title}
        </h2>
        <div className="w-48">
          <Select onValueChange={(value) => setSortOption(value as SortOption)} defaultValue="default">
            <SelectTrigger className='h-12 text-base'>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="visibility">Highest Visibility</SelectItem>
              <SelectItem value="traffic">Highest Traffic</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedBillboards.map((billboard) => (
          <BillboardCard key={billboard.id} billboard={billboard} />
        ))}
      </div>
    </div>
  );
}
