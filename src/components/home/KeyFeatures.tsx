import { Globe, Bot, PackageCheck, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Vast Network Across Ghana",
    description: "Access hundreds of premium billboards in every major city and region, from Accra to Tamale.",
  },
  {
    icon: Bot,
    title: "AI-Powered Insights",
    description: "Leverage artificial intelligence to get campaign recommendations and data-driven insights for maximum impact.",
  },
  {
    icon: PackageCheck,
    title: "All-in-One Ecosystem",
    description: "Manage everything from booking and payment to design, printing, and installation with our integrated vendor marketplace.",
  },
  {
    icon: ShieldCheck,
    title: "Verified & Trusted Partners",
    description: "Connect with a curated network of professional service providers to ensure your campaign is executed flawlessly.",
  },
];

export function KeyFeatures() {
  return (
    <section className="bg-secondary/50 py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            The Ultimate Advertising Platform for Ghana
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            More than just a marketplace. We provide the tools, insights, and network to make your outdoor advertising campaigns a success.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary text-primary-foreground mx-auto">
                <feature.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <div className="mt-5">
                <h3 className="text-lg font-semibold leading-6 text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-base text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
