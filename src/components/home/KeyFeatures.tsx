import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

const features = [
  { 
    title: 'Explore a vast network of premium billboards'
  },
  {
    title: 'Leverage AI for data-driven campaign insights'
  },
  {
    title: 'Manage your entire campaign from a single dashboard'
  }
];

export function KeyFeatures() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="absolute inset-0">
        <Image
          src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1771613077/gh_wrpkun.jpg"
          alt="Billboard at a junction"
          fill
          className="object-cover"
          data-ai-hint="billboard junction"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>

      <div className="relative container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            The Ultimate Advertising Platform for Ghana
          </h2>
          <p className="mt-4 text-lg text-stone-200">
            More than just a marketplace. We provide the tools, insights, and network to make your outdoor advertising campaigns a success.
          </p>
          <ul className="mt-8 space-y-4 text-left inline-block">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <div className="flex-shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <div className="ml-3">
                  <p className="text-lg text-white">{feature.title}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex gap-4 justify-center">
              <Button size="lg" asChild>
                  <Link href="/billboards">Browse Billboards</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-foreground" asChild>
                  <Link href="#">List a Space</Link>
              </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
