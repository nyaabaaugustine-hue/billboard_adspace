'use client';
import { useCollection, useFirestore } from '@/firebase';
import type { Billboard } from '@/lib/types';
import { collection, limit, query } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { Skeleton } from '../ui/skeleton';
import { billboards as mockBillboards } from '@/lib/data';

export function ScrollingBillboards() {
    const firestore = useFirestore();
    const billboardsQuery = useMemo(() => query(collection(firestore, 'billboards'), limit(10)), [firestore]);
    const { data: billboardsFromHook, loading } = useCollection<Billboard>(billboardsQuery);

    const billboards = useMemo(() => {
        if (!loading && billboardsFromHook && billboardsFromHook.length === 0) {
          return mockBillboards.slice(0, 10);
        }
        return billboardsFromHook;
      }, [billboardsFromHook, loading]);

    if (loading) {
        return (
            <div className="w-full overflow-hidden">
                <div className="flex">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex-shrink-0 mx-4 w-80 space-y-2">
                             <Skeleton className="aspect-[4/3] w-full rounded-[7%]" />
                             <Skeleton className="h-5 w-3/4" />
                             <Skeleton className="h-4 w-1/2" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    
    if (!billboards || billboards.length === 0) return null;

    const duplicatedBillboards = [...billboards, ...billboards];

    return (
        <div className="w-full overflow-hidden group" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
            <div className="flex animate-scroll group-hover:[animation-play-state:paused]">
                {duplicatedBillboards.map((billboard, index) => (
                    <Link href={`/billboards/${billboard.id}`} key={`${billboard.id}-${index}`} className="flex-shrink-0 mx-4 w-80 transition-transform duration-300 ease-in-out hover:-translate-y-2">
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[7%] shadow-lg">
                            <Image
                                src={billboard.imageUrl}
                                alt={billboard.title}
                                fill
                                className="object-cover"
                                data-ai-hint="billboard image"
                            />
                        </div>
                        <h3 className="font-semibold mt-3 truncate text-foreground">{billboard.title}</h3>
                        <p className="text-sm text-muted-foreground">{billboard.city}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
