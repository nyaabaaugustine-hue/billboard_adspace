import Image from "next/image";
import { SmartSearchBar, type SearchFilters } from "./SmartSearchBar";
import { PlaceHolderImages } from "@/lib/placeholder-images";

interface HeroProps {
  onSearch: (filters: SearchFilters) => void;
}

export function Hero({ onSearch }: HeroProps) {
  const heroImage = PlaceHolderImages.find((img) => img.id === "hero-1");

  return (
    <div className="relative h-[60vh] min-h-[500px] w-full">
      <div className="absolute inset-0">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <h1 className="font-headline mb-4 text-4xl font-extrabold tracking-tight text-stone-200 md:text-6xl lg:text-7xl">
          Book Premium Billboard Spaces
          <br />
          Across <span className="text-accent">Ghana</span>
        </h1>
        <p className="mb-8 max-w-2xl text-lg text-neutral-200 md:text-xl">
          Discover, book, and manage high-impact advertising spaces with ease.
        </p>
        <SmartSearchBar onSearch={onSearch} />
      </div>
    </div>
  );
}
