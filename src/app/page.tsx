import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { billboards, regions } from "@/lib/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const InteractiveMap = dynamic(
  () => import("@/components/map/InteractiveMap"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[calc(100vh-80px)] w-full animate-pulse bg-muted" />
    ),
  }
);

export default function Home() {
  const mapBillboards = billboards.map((b) => ({
    id: b.id,
    title: b.title,
    latitude: b.latitude,
    longitude: b.longitude,
    pricePerMonth: b.pricePerMonth,
    city: b.city,
  }));

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="relative flex-grow">
        <div className="absolute left-0 top-0 z-10 w-full p-4">
          <div className="container mx-auto flex flex-col items-center justify-center gap-4 rounded-lg bg-background/80 p-6 shadow-lg backdrop-blur-sm md:flex-row">
            <h1 className="text-center font-headline text-2xl font-bold text-foreground md:text-left">
              Find Your Perfect Billboard in Ghana
            </h1>
            <div className="flex w-full flex-col gap-2 sm:flex-row md:w-auto md:flex-grow">
              <Select>
                <SelectTrigger className="w-full md:w-[200px] bg-background">
                  <SelectValue placeholder="Select a region" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region.id} value={region.name}>
                      {region.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full md:w-[200px] bg-background">
                  <SelectValue placeholder="Select a city" />
                </SelectTrigger>
                <SelectContent>
                  {[...new Set(billboards.map((b) => b.city))].map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button className="w-full md:w-auto">
                <Search className="mr-2 h-4 w-4" /> Search
              </Button>
            </div>
          </div>
        </div>
        <InteractiveMap billboards={mapBillboards} />
      </main>
      <Footer />
    </div>
  );
}
