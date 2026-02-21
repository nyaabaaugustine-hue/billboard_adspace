import { RecentBillboardCard } from './RecentBillboardCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Billboard } from '@/lib/types';
import { Skeleton } from '../ui/skeleton';

interface RecentBillboardsProps {
  billboards: Billboard[] | null;
  loading: boolean;
}

export function RecentBillboards({ billboards, loading }: RecentBillboardsProps) {

  if (loading) {
    return (
       <div className="container mx-auto px-4 py-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Recent Billboards</h2>
            <Button variant="outline" asChild>
              <Link href="/billboards">All Billboards</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {[...Array(2)].map((_, i) => (
                <Skeleton key={i} className="h-48 w-full rounded-2xl" />
            ))}
          </div>
       </div>
    );
  }

  if (!billboards || billboards.length === 0) {
    return null;
  }


  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Recent Billboards</h2>
        <Button variant="outline" asChild>
          <Link href="/billboards">All Billboards</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {billboards.map((billboard) => (
          <RecentBillboardCard key={billboard.id} billboard={billboard} />
        ))}
      </div>
    </div>
  );
}
