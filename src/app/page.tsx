'use client';

import { useState } from 'react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { billboards, regions } from "@/lib/data";
import { Hero } from "@/components/home/Hero";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { BillboardGrid } from "@/components/home/BillboardGrid";
import { RecentBillboards } from "@/components/home/RecentBillboards";
import { PartnerVendors } from "@/components/home/PartnerVendors";
import { type SearchFilters } from '@/components/home/SmartSearchBar';

export default function Home() {
  const [displayBillboards, setDisplayBillboards] = useState(billboards);

  const handleSearch = (filters: SearchFilters) => {
    const { searchTerm, date, type } = filters;
    let filtered = [...billboards];

    // Filter by type
    if (type && type !== 'all') {
        filtered = filtered.filter(billboard => billboard.type === type);
    }
    
    // Filter by availability if a date is selected
    if (date) {
        filtered = filtered.filter(billboard => billboard.status === 'Available');
    }

    // Filter and sort by search term for relevance
    if (searchTerm) {
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

                    // Score for exact match on location (high priority)
                    if (city === lowercasedFilter || regionName === lowercasedFilter) {
                        score += 10;
                    } 
                    // Score for starting with match on location
                    else if (city.startsWith(lowercasedFilter) || regionName.startsWith(lowercasedFilter)) {
                        score += 5;
                    }
                    // Score for including match on location
                     else if (city.includes(lowercasedFilter) || regionName.includes(lowercasedFilter)) {
                        score += 2;
                    }

                    // Score for title match
                    if (title.includes(lowercasedFilter)) {
                        score += 3;
                    }
                    // Score for address match (lower priority)
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
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow">
        <Hero onSearch={handleSearch} />
        <WhyChooseUs />
        <div className="container mx-auto px-4 py-16">
          <BillboardGrid billboards={displayBillboards} />
        </div>
        <RecentBillboards />
        <PartnerVendors />
      </main>
      <Footer />
    </div>
  );
}
