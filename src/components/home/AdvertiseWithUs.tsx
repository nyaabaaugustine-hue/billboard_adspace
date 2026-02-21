import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Rocket } from 'lucide-react';

export function AdvertiseWithUs() {
  return (
    <section className="bg-gradient-to-r from-primary/90 to-primary py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-4">
            <Rocket className="h-12 w-12 text-primary-foreground/80 hidden sm:block" />
            <div>
              <h2 className="font-headline text-3xl font-bold text-primary-foreground">
                Advertise With Us
              </h2>
              <p className="mt-1 text-lg text-primary-foreground/90">
                We reach millions of potential customers across Ghana daily.
              </p>
            </div>
          </div>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-bold flex-shrink-0"
          >
            <Link href="/for-advertisers">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
