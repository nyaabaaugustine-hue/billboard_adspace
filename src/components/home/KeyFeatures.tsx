import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const features = [
  'Explore a vast network of premium billboards',
  'Leverage AI for data-driven campaign insights',
  'Manage your entire campaign from a single dashboard',
];

export function KeyFeatures() {
  const sectionImage = PlaceHolderImages.find((img) => img.id === 'why-choose-us-1');

  return (
    <section className="py-16 sm:py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              The Ultimate Advertising Platform for Ghana
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              More than just a marketplace. We provide the tools, insights, and network to make your outdoor advertising campaigns a success.
            </p>
            <ul className="mt-8 space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mr-3 mt-1" />
                  <span className="text-lg text-foreground/80">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="/billboards">Browse Billboards</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#">List a Space</Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            {sectionImage ? (
              <Image
                src={sectionImage.imageUrl}
                alt={sectionImage.description}
                width={500}
                height={500}
                className="rounded-xl object-cover aspect-square"
                data-ai-hint={sectionImage.imageHint}
              />
            ) : (
                <div className="w-[500px] h-[500px] bg-muted rounded-xl"></div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
