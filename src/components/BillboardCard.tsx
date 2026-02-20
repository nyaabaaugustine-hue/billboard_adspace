import Link from "next/link";
import Image from "next/image";
import type { Billboard } from "@/lib/types";
import { Star, Heart, Building } from "lucide-react";
import { regions } from "@/lib/data";
import { Button } from "./ui/button";

interface BillboardCardProps {
  billboard: Billboard;
}

export function BillboardCard({ billboard }: BillboardCardProps) {
  const regionName = regions.find(r => r.id === billboard.regionId)?.name;

  return (
    <Link href={`/billboards/${billboard.id}`} className="group block">
        <div className="relative">
             <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-card">
                <Image
                src={billboard.imageUrl}
                alt={billboard.title}
                width={400}
                height={300}
                className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                data-ai-hint="billboard image"
                />
            </div>
             <Button variant="ghost" size="icon" className="absolute top-3 right-3 rounded-full bg-background/60 hover:bg-background/80 text-foreground">
                <Heart className="h-5 w-5" />
            </Button>
        </div>
     
      <div className="mt-3">
        <div className="flex justify-between items-start">
            <h3 className="text-base font-semibold text-foreground truncate">
                {billboard.title}
            </h3>
            <div className="flex items-center text-sm font-medium shrink-0 ml-2">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400 mr-1" />
                <span className="font-bold">{billboard.visibilityScore}</span>
            </div>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{billboard.city}{regionName && `, ${regionName}`}</p>
        <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
            <Building className="h-4 w-4" />
            <span>{billboard.type}</span>
        </div>
       </div>
       <p className="mt-2 text-base font-medium text-foreground">
            <span className="font-bold">GH₵ {billboard.pricePerMonth.toLocaleString()}</span> / month
        </p>
    </Link>
  );
}
