'use client';

import { useState, useEffect } from 'react';
import { X, Sparkles, MapPin, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useCollection, useFirestore } from '@/firebase';
import { collection, query, limit } from 'firebase/firestore';
import type { Billboard } from '@/lib/types';
import { billboards as mockBillboards } from '@/lib/data';

export function AdSlider() {
  const [isVisible, setIsVisible] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  const [ads, setAds] = useState<Billboard[]>([]);
  const firestore = useFirestore();
  const billboardsQuery = query(collection(firestore, 'billboards'), limit(10));
  const { data: fetchedBillboards, loading } = useCollection<Billboard>(billboardsQuery);

  useEffect(() => {
    if (fetchedBillboards && fetchedBillboards.length > 0) {
      const shuffled = [...fetchedBillboards].sort(() => 0.5 - Math.random());
      setAds(shuffled.slice(0, 5));
    } else if (!loading && fetchedBillboards && fetchedBillboards.length === 0) {
      const shuffled = [...mockBillboards].sort(() => 0.5 - Math.random());
      setAds(shuffled.slice(0, 5));
    }
  }, [fetchedBillboards, loading]);

  useEffect(() => {
    if (sessionStorage.getItem('adSliderDismissed') === 'true') {
      setIsDismissed(true);
    }
  }, []);

  useEffect(() => {
    if (isDismissed || ads.length === 0) {
      return;
    }

    const adCycle = () => {
      const showTimer = setTimeout(() => setIsVisible(true), 2000);
      const hideTimer = setTimeout(() => setIsVisible(false), 14000);
      const nextTimer = setTimeout(() => {
        setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
      }, 15000);
      return { showTimer, hideTimer, nextTimer };
    };

    const timers = adCycle();
    return () => {
      clearTimeout(timers.showTimer);
      clearTimeout(timers.hideTimer);
      clearTimeout(timers.nextTimer);
    };
  }, [currentAdIndex, isDismissed, ads.length]);

  useEffect(() => {
    if (isVisible) {
      setIsRendered(true);
    } else {
      const unmountTimer = setTimeout(() => setIsRendered(false), 700);
      return () => clearTimeout(unmountTimer);
    }
  }, [isVisible]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    sessionStorage.setItem('adSliderDismissed', 'true');
  };

  const currentAd = ads[currentAdIndex];

  if (isDismissed || !isRendered || loading || !currentAd) {
    return null;
  }

  return (
    <div
      className={cn(
          'fixed bottom-4 left-4 z-50 w-full max-w-sm transition-all duration-700 ease-in-out',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
      )}
    >
        <Link href={`/billboards/${currentAd.id}`} className="block group">
            <div className="relative overflow-hidden rounded-xl bg-card/60 p-4 shadow-2xl backdrop-blur-xl border border-border/20 hover:border-primary/50 transition-all">
                <div className="flex gap-4 items-center">
                    <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-muted shrink-0">
                        <Image
                            src={currentAd.imageUrl}
                            alt={currentAd.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                            data-ai-hint="billboard image"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute bottom-1 left-1 text-xs font-bold text-white">
                            GH₵{currentAd.pricePerMonth.toLocaleString()}
                        </div>
                    </div>
                    <div className="flex-grow min-w-0">
                        <div className="flex items-center gap-2">
                             <Sparkles className="h-4 w-4 text-primary" />
                             <p className="text-xs font-bold uppercase tracking-wider text-primary">Featured Billboard</p>
                        </div>
                        <p className="font-semibold text-sm text-foreground group-hover:underline leading-tight mt-1 truncate">
                            {currentAd.title}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground mt-1 gap-2">
                          <div className="flex items-center gap-1 min-w-0">
                              <MapPin className="h-3 w-3 shrink-0" />
                              <span className="truncate">{currentAd.city}</span>
                          </div>
                          <div className="flex items-center gap-1 min-w-0">
                              <Building className="h-3 w-3 shrink-0" />
                              <span className="truncate">{currentAd.type}</span>
                          </div>
                        </div>
                    </div>
                </div>
                <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7 shrink-0 z-10" onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDismiss();
                }}>
                    <X className="h-4 w-4" />
                    <span className="sr-only">Dismiss</span>
                </Button>
            </div>
        </Link>
    </div>
  );
}