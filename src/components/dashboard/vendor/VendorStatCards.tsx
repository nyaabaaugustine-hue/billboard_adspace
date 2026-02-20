'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign, Megaphone, Briefcase, Star } from "lucide-react";
import { useInView } from 'framer-motion';
import { useEffect, useRef } from "react";
import { animate } from 'framer-motion';

const stats = [
  {
    title: "Total Earnings",
    value: 45231,
    prefix: "GH₵ ",
    change: "+20.1% from last month",
    icon: DollarSign,
  },
  {
    title: "Active Bookings",
    value: 12,
    prefix: "",
    change: "2 new this week",
    icon: Briefcase,
  },
  {
    title: "Listed Billboards",
    value: 23,
    prefix: "",
    change: "1 awaiting approval",
    icon: Megaphone,
  },
  {
    title: "Average Rating",
    value: 4.8,
    prefix: "",
    change: "out of 5",
    isRating: true,
    icon: Star,
  },
];

function Counter({ from, to, prefix, isRating }: { from: number; to: number, prefix: string, isRating?: boolean }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView && ref.current) {
      const controls = animate(from, to, {
        duration: 1.5,
        onUpdate(value) {
          if (ref.current) {
            if(isRating) {
                ref.current.textContent = prefix + value.toFixed(1);
            } else {
                ref.current.textContent = prefix + value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
          }
        },
      });
      return () => controls.stop();
    }
  }, [from, to, inView, prefix, isRating]);

  return <p ref={ref} className="text-2xl font-bold">{prefix}{isRating ? from.toFixed(1) : from.toLocaleString()}</p>;
}

export function VendorStatCards() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
                <Counter from={0} to={stat.value} prefix={stat.prefix} isRating={stat.isRating} />
            </div>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
