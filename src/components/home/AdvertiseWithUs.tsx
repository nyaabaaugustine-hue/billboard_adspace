import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { OwareLogo } from '@/components/icons/OwareLogo';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function AdvertiseWithUs() {
  const bgImage = PlaceHolderImages.find(p => p.id === 'why-choose-us-1');

  return (
    <section className="relative py-20 sm:py-24">
      {bgImage && (
        <Image 
          src={bgImage.imageUrl}
          alt={bgImage.description}
          fill
          className="object-cover"
          data-ai-hint={bgImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
            <div className="inline-block mb-6">
                 <OwareLogo width={100} />
            </div>
            <h2 className="font-headline text-4xl sm:text-5xl font-bold text-white">
                Advertise With Us
            </h2>
            <p className="mt-4 text-lg sm:text-xl text-neutral-200 max-w-2xl mx-auto">
                We reach millions of potential customers across Ghana daily.
            </p>
            <div className="mt-8">
                <Button
                    asChild
                    size="lg"
                    className="font-bold"
                >
                    <Link href="/for-advertisers">Learn More</Link>
                </Button>
            </div>
        </div>
      </div>
    </section>
  );
}
