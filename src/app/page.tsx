import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { billboards } from "@/lib/data";
import { Hero } from "@/components/home/Hero";
import { BillboardGrid } from "@/components/home/BillboardGrid";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow">
        <Hero />
        <div className="container mx-auto px-4 py-16">
          <BillboardGrid billboards={billboards} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
