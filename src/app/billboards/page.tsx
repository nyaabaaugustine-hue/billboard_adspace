
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { billboards } from '@/lib/data';
import { BillboardGrid } from '@/components/home/BillboardGrid';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutGrid, Map } from 'lucide-react';
import type { MapBillboard } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

const InteractiveMap = dynamic(() => import('@/components/map/InteractiveMap'), {
  ssr: false,
  loading: () => <Skeleton className="h-[calc(100vh-200px)] w-full" />,
});

const mapBillboardsData: MapBillboard[] = billboards.map((b) => ({
  id: b.id,
  title: b.title,
  latitude: b.latitude,
  longitude: b.longitude,
  pricePerMonth: b.pricePerMonth,
  city: b.city,
}));

export default function BillboardsPage() {
  const [view, setView] = useState('grid');

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="grid" value={view} onValueChange={setView} className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Explore Billboards</h1>
                <TabsList>
                    <TabsTrigger value="grid" className="flex items-center gap-2">
                        <LayoutGrid className="h-5 w-5" />
                        <span>Grid</span>
                    </TabsTrigger>
                    <TabsTrigger value="map" className="flex items-center gap-2">
                        <Map className="h-5 w-5" />
                        <span>Map</span>
                    </TabsTrigger>
                </TabsList>
            </div>
            <TabsContent value="grid">
              <BillboardGrid billboards={billboards} />
            </TabsContent>
            <TabsContent value="map">
              <div className="rounded-xl overflow-hidden border h-[calc(100vh-240px)]">
                <InteractiveMap billboards={mapBillboardsData} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
