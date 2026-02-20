import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { billboards } from "@/lib/data";
import { BillboardCard } from "@/components/BillboardCard";
import { Hero } from "@/components/home/Hero";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow">
        <Hero />
        <div className="container mx-auto px-4 py-16">
           <h2 className="mb-8 text-3xl font-bold tracking-tight">
            Featured Billboards
          </h2>
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {billboards.map((billboard) => (
              <BillboardCard key={billboard.id} billboard={billboard} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
