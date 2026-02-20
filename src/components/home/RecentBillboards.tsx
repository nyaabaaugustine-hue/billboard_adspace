import { billboards } from '@/lib/data';
import { RecentBillboardCard } from './RecentBillboardCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function RecentBillboards() {
  // Show the last 4 added billboards as "Recent"
  const recentBillboards = billboards.slice(-4).reverse();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Recent Billboards</h2>
        <Button variant="outline" asChild>
          <Link href="/billboards">All Billboards</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {recentBillboards.map((billboard) => (
          <RecentBillboardCard key={billboard.id} billboard={billboard} />
        ))}
      </div>
    </div>
  );
}
