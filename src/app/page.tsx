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

    if (searchTerm) {
        const lowercasedFilter = searchTerm.toLowerCase();
        filtered = filtered.filter(billboard => {
            const regionName = regions.find(r => r.id === billboard.regionId)?.name || '';
            return billboard.city.toLowerCase().includes(lowercasedFilter) ||
                regionName.toLowerCase().includes(lowercasedFilter) ||
                billboard.address.toLowerCase().includes(lowercasedFilter) ||
                billboard.title.toLowerCase().includes(lowercasedFilter)
        });
    }

    if (type && type !== 'all') {
        filtered = filtered.filter(billboard => billboard.type === type);
    }
    
    // If a date is selected, we'll only show billboards that are currently "Available".
    // This is a simplified stand-in for a real availability check.
    if (date) {
        filtered = filtered.filter(billboard => billboard.status === 'Available');
    }

    setDisplayBillboards(filtered);
  }

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
