import Link from 'next/link';
import Image from 'next/image';
import type { Billboard } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

interface RecentBillboardCardProps {
  billboard: Billboard;
}

export function RecentBillboardCard({ billboard }: RecentBillboardCardProps) {
  const [width, height] = billboard.size.split(' x ');

  const getStatusBadge = () => {
    switch (billboard.status) {
      case 'On Hold':
        return <Badge className="absolute top-4 left-4 bg-amber-500 text-white border-amber-500">On Hold</Badge>;
      case 'Rented':
        return <Badge variant="secondary" className="absolute top-4 left-4">Rented</Badge>;
      default:
        return null;
    }
  };

  return (
    <Link href={`/billboards/${billboard.id}`} className="block group">
      <div className="flex flex-col md:flex-row gap-6 rounded-2xl border bg-card p-4 text-card-foreground shadow-sm transition-shadow hover:shadow-lg">
        <div className="relative aspect-[4/3] w-full md:w-1/3 lg:w-1/4 overflow-hidden rounded-xl bg-card">
          <Image
            src={billboard.imageUrl}
            alt={billboard.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint="billboard image"
          />
        </div>
        <div className="flex flex-col justify-between flex-1 relative">
            {getStatusBadge()}
          <div>
            <p className="text-xl font-bold text-primary pt-10">
              GH₵ {billboard.pricePerMonth.toLocaleString()} / Monthly
            </p>
            <h3 className="text-2xl font-semibold text-foreground group-hover:underline mt-1">
              {billboard.title}
            </h3>
            <p className="text-base text-muted-foreground mt-1">{billboard.address}, {billboard.city}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2 mt-4 text-base">
              <div>
                <span className="font-semibold text-muted-foreground">Length:</span> {width}
              </div>
              <div>
                <span className="font-semibold text-muted-foreground">Height:</span> {height}
              </div>
              <div>
                <span className="font-semibold text-muted-foreground">Sides:</span> {billboard.sides}
              </div>
              <div>
                <span className="font-semibold text-muted-foreground">Lighting:</span> {billboard.lighting ? 'YES' : 'NO'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
