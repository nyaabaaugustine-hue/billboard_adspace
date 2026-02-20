import Image from 'next/image';
import { Button } from '../ui/button';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

const features = [
  'Vast Network Across Ghana',
  'AI-Powered Insights',
  'All-in-One Ecosystem',
  'Verified & Trusted Partners',
];

export function WhyChooseUs() {
  return (
    <div className="bg-secondary/50 py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div className="lg:pr-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              The Ultimate Advertising Platform for Ghana
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              More than just a marketplace. We provide the tools, insights, and network to make your outdoor advertising campaigns a success.
            </p>
            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-muted-foreground lg:max-w-none">
                <div className="flex flex-col gap-y-4">
                    <div className="relative pl-9">
                        <dt className="inline font-semibold text-foreground">
                            <CheckCircle2 className="absolute left-1 top-1 h-5 w-5 text-primary" />
                            Vast Network Across Ghana
                        </dt>
                        <dd className="inline ml-2">Access hundreds of premium billboards in every major city and region.</dd>
                    </div>
                    <div className="relative pl-9">
                        <dt className="inline font-semibold text-foreground">
                            <CheckCircle2 className="absolute left-1 top-1 h-5 w-5 text-primary" />
                            AI-Powered Insights
                        </dt>
                        <dd className="inline ml-2">Leverage data-driven insights for maximum campaign impact.</dd>
                    </div>
                    <div className="relative pl-9">
                        <dt className="inline font-semibold text-foreground">
                            <CheckCircle2 className="absolute left-1 top-1 h-5 w-5 text-primary" />
                            All-in-One Ecosystem
                        </dt>
                        <dd className="inline ml-2">Manage everything from booking to installation in one place.</dd>
                    </div>
                     <div className="relative pl-9">
                        <dt className="inline font-semibold text-foreground">
                            <CheckCircle2 className="absolute left-1 top-1 h-5 w-5 text-primary" />
                            Verified & Trusted Partners
                        </dt>
                        <dd className="inline ml-2">Connect with a curated network of professional service providers.</dd>
                    </div>
                </div>
            </dl>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl lg:order-first">
            <Image
              src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1771613077/gh_wrpkun.jpg"
              alt="Billboard at a junction"
              fill
              className="object-cover"
              data-ai-hint="billboard junction"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
