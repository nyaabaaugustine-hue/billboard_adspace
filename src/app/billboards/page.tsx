
'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { BillboardGrid } from '@/components/home/BillboardGrid';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutGrid, Map } from 'lucide-react';
import type { MapBillboard, Billboard } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { useCollection, useFirestore } from '@/firebase';
import { collection } from 'firebase/firestore';

const InteractiveMap = dynamic(() => import('@/components/map/InteractiveMap'), {
  ssr: false,
  loading: () => <Skeleton className="h-[calc(100vh-200px)] w-full" />,
});

export default function BillboardsPage() {
  const [view, setView] = useState('grid');
  const firestore = useFirestore();
  const billboardsCol = useMemo(() => collection(firestore, 'billboards'), [firestore]);
  const { data: billboards, loading } = useCollection<Billboard>(billboardsCol);

  const mapBillboardsData: MapBillboard[] = (billboards || []).map((b) => ({
    id: b.id,
    title: b.title,
    latitude: b.latitude,
    longitude: b.longitude,
    pricePerMonth: b.pricePerMonth,
    city: b.city,
  }));

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
              {loading ? (
                <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {[...Array(8)].map((_, i) => (
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
              ) : (
                <BillboardGrid billboards={billboards || []} />
              )}
            </TabsContent>
            <TabsContent value="map">
              <div className="rounded-xl overflow-hidden border h-[calc(100vh-240px)]">
                {loading ? (
                  <Skeleton className="h-full w-full" />
                ) : (
                  <InteractiveMap billboards={mapBillboardsData} />
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
