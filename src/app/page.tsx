'use client';

import { useState, useMemo } from 'react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { regions } from "@/lib/data";
import { Hero } from "@/components/home/Hero";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { BillboardGrid } from "@/components/home/BillboardGrid";
import { RecentBillboards } from "@/components/home/RecentBillboards";
import { PartnerVendors } from "@/components/home/PartnerVendors";
import { type SearchFilters } from '@/components/home/SmartSearchBar';
import { Testimonials } from '@/components/home/Testimonials';
import { AsibiFab } from '@/components/ai/AsibiFab';
import { useCollection, useFirestore } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import type { Billboard } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { AdvertiseWithUs } from '@/components/home/AdvertiseWithUs';

export default function Home() {
  const firestore = useFirestore();

  const billboardsCol = collection(firestore, 'billboards');
  const { data: allBillboards, loading: billboardsLoading } = useCollection<Billboard>(billboardsCol);

  const [displayBillboards, setDisplayBillboards] = useState<Billboard[] | null>(null);
  const [gridTitle, setGridTitle] = useState('Featured Billboards');

  const recentBillboardsQuery = useMemo(() => query(billboardsCol, orderBy('createdAt', 'desc'), limit(4)), [billboardsCol]);
  const { data: recentBillboards, loading: recentLoading } = useCollection<Billboard>(recentBillboardsQuery);

  const handleSearch = (filters: SearchFilters) => {
    if (!allBillboards) return;
    const { searchTerm, date, type } = filters;
    let filtered = [...allBillboards];
    let isSearchActive = false;

    // Filter by type
    if (type && type !== 'all') {
        filtered = filtered.filter(billboard => billboard.type === type);
        isSearchActive = true;
    }
    
    // Filter by availability if a date is selected
    if (date) {
        filtered = filtered.filter(billboard => billboard.status === 'Available');
        isSearchActive = true;
    }

    // Filter and sort by search term for relevance
    if (searchTerm) {
        isSearchActive = true;
        const lowercasedFilter = searchTerm.toLowerCase();

        const searchResults = filtered
            .map(billboard => {
                const regionName = regions.find(r => r.id === billboard.regionId)?.name.toLowerCase() || '';
                const city = billboard.city.toLowerCase();
                const title = billboard.title.toLowerCase();
                const address = billboard.address.toLowerCase();

                let score = 0;
                let matches = false;

                if (regionName.includes(lowercasedFilter) || city.includes(lowercasedFilter) || title.includes(lowercasedFilter) || address.includes(lowercasedFilter)) {
                    matches = true;

                    if (city === lowercasedFilter || regionName === lowercasedFilter) {
                        score += 10;
                    } 
                    else if (city.startsWith(lowercasedFilter) || regionName.startsWith(lowercasedFilter)) {
                        score += 5;
                    }
                     else if (city.includes(lowercasedFilter) || regionName.includes(lowercasedFilter)) {
                        score += 2;
                    }

                    if (title.includes(lowercasedFilter)) {
                        score += 3;
                    }
                    if (address.includes(lowercasedFilter)) {
                        score += 1;
                    }
                }
                
                return { billboard, score, matches };
            })
            .filter(item => item.matches)
            .sort((a, b) => b.score - a.score)
            .map(item => item.billboard);
        
        setDisplayBillboards(searchResults);
    } else {
        setDisplayBillboards(filtered);
    }

    setGridTitle(isSearchActive ? 'Search Results' : 'Featured Billboards');

    setTimeout(() => {
        const element = document.getElementById('billboard-results');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }, 100);
  };

  const billboardsToDisplay = displayBillboards ?? allBillboards ?? [];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow">
        <Hero onSearch={handleSearch} />
        <AdvertiseWithUs />
        <WhyChooseUs />
        <div id="billboard-results" className="container mx-auto scroll-mt-20 px-4 py-16">
          { billboardsLoading ? (
             <div>
                <div className="flex justify-between items-center mb-8">
                  <Skeleton className="h-10 w-64" />
                  <Skeleton className="h-12 w-48" />
                </div>
                <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {[...Array(4)].map((_, i) => (
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
          ) : (
            <BillboardGrid billboards={billboardsToDisplay} title={gridTitle} />
          )}
        </div>
        <RecentBillboards billboards={recentBillboards} loading={recentLoading} />
        <PartnerVendors />
        <Testimonials />
        <AsibiFab />
      </main>
      <Footer />
    </div>
  );
}
