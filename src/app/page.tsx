'use client';

import { useState } from 'react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { billboards } from "@/lib/data";
import { Hero } from "@/components/home/Hero";
import { KeyFeatures } from "@/components/home/KeyFeatures";
import { BillboardGrid } from "@/components/home/BillboardGrid";
import { RecentBillboards } from "@/components/home/RecentBillboards";
import { PartnerVendors } from "@/components/home/PartnerVendors";
import { type SearchFilters } from '@/components/home/SmartSearchBar';

export default function Home() {
  const [displayBillboards, setDisplayBillboards] = useState(billboards);

  const handleSearch = (filters: SearchFilters) => {
    const { searchTerm, type } = filters;
    let filtered = [...billboards];

    if (searchTerm) {
        const lowercasedFilter = searchTerm.toLowerCase();
        filtered = filtered.filter(billboard => 
            billboard.city.toLowerCase().includes(lowercasedFilter) ||
            billboard.address.toLowerCase().includes(lowercasedFilter) ||
            billboard.title.toLowerCase().includes(lowercasedFilter)
        );
    }

    if (type && type !== 'all') {
        filtered = filtered.filter(billboard => billboard.type === type);
    }
    
    // NOTE: Date filtering is not implemented as the billboard data model does not contain availability dates.

    setDisplayBillboards(filtered);
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow">
        <Hero onSearch={handleSearch} />
        <KeyFeatures />
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
