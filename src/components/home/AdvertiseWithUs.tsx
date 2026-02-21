import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { OwareLogo } from '@/components/icons/OwareLogo';

export function AdvertiseWithUs() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-8 rounded-2xl bg-gradient-to-r from-primary/90 to-primary p-8 text-center shadow-lg sm:flex-row sm:text-left">
          <div className="flex items-center gap-6">
            <div className="hidden shrink-0 sm:block">
                <OwareLogo width={80} />
            </div>
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
