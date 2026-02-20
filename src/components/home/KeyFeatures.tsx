import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const features = [
  { 
    title: 'Vast Network Across Ghana',
    description: 'Access hundreds of premium billboards in every major city and region, from Accra to Tamale.'
  },
  {
    title: 'AI-Powered Insights',
    description: 'Leverage artificial intelligence to get campaign recommendations and data-driven insights for maximum impact.'
  },
  {
    title: 'All-in-One Ecosystem',
    description: 'Manage everything from booking and payment to design, printing, and installation with our integrated vendor marketplace.'
  }
];

export function KeyFeatures() {
  const sectionImage = PlaceHolderImages.find((img) => img.id === 'why-choose-us-1');

  return (
    <section className="py-16 sm:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              The Ultimate Advertising Platform for Ghana
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              More than just a marketplace. We provide the tools, insights, and network to make your outdoor advertising campaigns a success.
            </p>
            <ul className="mt-8 space-y-6">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold leading-6 text-foreground">{feature.title}</h3>
                    <p className="mt-2 text-base text-muted-foreground">{feature.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center lg:justify-end">
            {sectionImage ? (
              <div className="aspect-[4/3] w-full max-w-lg overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={sectionImage.imageUrl}
                  alt={sectionImage.description}
                  width={600}
                  height={450}
                  className="h-full w-full object-cover"
                  data-ai-hint={sectionImage.imageHint}
                />
              </div>
            ) : (
                <div className="w-full max-w-lg h-[450px] bg-muted rounded-lg shadow-lg"></div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
