import Link from 'next/link';
import type { Billboard } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MapPin, Maximize, Layers, Sun, BarChart, Star, CheckCircle } from 'lucide-react';
import { regions, vendors } from '@/lib/data';
import Image from 'next/image';

interface SimilarBillboardCardProps {
  billboard: Billboard;
}

export function SimilarBillboardCard({ billboard }: SimilarBillboardCardProps) {
  const regionName = regions.find(r => r.id === billboard.regionId)?.name;
  const vendor = vendors.find(v => v.id === billboard.vendorId);

  const getStatusBadge = () => {
    switch (billboard.status) {
      case 'On Hold':
        return <Badge className="border-yellow-300 bg-yellow-100 text-yellow-800 dark:border-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300">On Hold</Badge>;
      case 'Rented':
        return <Badge variant="secondary">Rented</Badge>;
      default:
        return <Badge className="border-green-300 bg-green-100 text-green-800 dark:border-green-700 dark:bg-green-900/50 dark:text-green-300">Available</Badge>;
    }
  };

  const trafficLabel = (billboard.type === 'Unipole' || billboard.type === 'Gantry') && billboard.trafficEstimate > 150000 
    ? 'Highway Exposure' 
    : 'Daily Traffic';

  return (
    <Link href={`/billboards/${billboard.id}`} className="block h-full group">
      <Card className="flex flex-col h-full rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-2xl">
            <Image
                src={billboard.imageUrl}
                alt={billboard.title}
                width={400}
                height={300}
                className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                data-ai-hint="billboard image"
            />
        </div>
        <CardHeader>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="text-sm">
              {billboard.type}
            </Badge>
            {getStatusBadge()}
          </div>
          <CardTitle className="pt-2 text-xl truncate group-hover:text-primary transition-colors">{billboard.title}</CardTitle>
          {vendor && (
            <p className="text-muted-foreground text-sm">
              by <span className="font-semibold text-foreground">{vendor.name}</span>
            </p>
          )}
        </CardHeader>
        <CardContent className="flex flex-col flex-grow">
          <Separator className="mb-4" />
          <div className="space-y-3 text-sm flex-grow">
             <div className="flex items-start">
              <MapPin className="mr-3 mt-1 h-4 w-4 flex-shrink-0 text-primary" />
              <div>
                  <span className="font-semibold">Location</span>
                  <p className="text-muted-foreground">{billboard.address}, {billboard.city}</p>
              </div>
             </div>
             <div className="flex items-start">
              <BarChart className="mr-3 mt-1 h-4 w-4 flex-shrink-0 text-primary" />
              <div>
                  <span className="font-semibold">{trafficLabel}</span>
                  <p className="text-muted-foreground">{billboard.trafficEstimate.toLocaleString()} est. daily views</p>
              </div>
             </div>
             <div className="flex items-start">
              <Star className="mr-3 mt-1 h-4 w-4 flex-shrink-0 text-primary fill-current" />
              <div>
                  <span className="font-semibold">Visibility Score</span>
                  <p className="text-muted-foreground">{billboard.visibilityScore} / 10</p>
              </div>
             </div>
          </div>
          <Separator className="my-4" />
          <div className="space-y-1 mt-auto">
            <h3 className="text-md font-semibold">Price</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-accent">
                GH₵{billboard.pricePerMonth.toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2})}
              </span>
              <span className="text-sm font-medium text-muted-foreground">/month</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
