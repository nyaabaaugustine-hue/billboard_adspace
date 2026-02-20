import Link from "next/link";
import Image from "next/image";
import type { Billboard } from "@/lib/types";
import { Star } from "lucide-react";
import { regions } from "@/lib/data";

interface BillboardCardProps {
  billboard: Billboard;
}

export function BillboardCard({ billboard }: BillboardCardProps) {
  const regionName = regions.find(r => r.id === billboard.regionId)?.name;

  return (
    <Link href={`/billboards/${billboard.id}`} className="group">
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-200">
        <Image
          src={billboard.imageUrl}
          alt={billboard.title}
          width={400}
          height={400}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          data-ai-hint="billboard image"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            {billboard.city}{regionName && `, ${regionName}`}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{billboard.title}</p>
        </div>
        <div className="flex items-center text-sm font-medium">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
          <span>{billboard.visibilityScore}</span>
        </div>
      </div>
       <p className="mt-2 text-sm font-medium text-foreground">
            <span className="font-bold">GHS {billboard.pricePerMonth.toLocaleString()}</span> / month
        </p>
    </Link>
  );
}
