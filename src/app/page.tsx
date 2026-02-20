import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { billboards } from "@/lib/data";
import { BillboardCard } from "@/components/BillboardCard";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
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
