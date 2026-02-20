'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign, Megaphone, Briefcase, Users } from "lucide-react";
import { useInView } from 'framer-motion';
import { useEffect, useRef } from "react";
import { animate } from 'framer-motion';

const stats = [
  {
    title: "Total Revenue",
    value: 1250000,
    prefix: "GH₵ ",
    change: "+12.5% from last month",
    icon: DollarSign,
  },
  {
    title: "Active Bookings",
    value: 84,
    prefix: "",
    change: "+2 since yesterday",
    icon: Briefcase,
  },
  {
    title: "Active Billboards",
    value: 152,
    prefix: "",
    change: "3 awaiting approval",
    icon: Megaphone,
  },
  {
    title: "New Vendors",
    value: 5,
    prefix: "",
    change: "+2 this week",
    icon: Users,
  },
];


function Counter({ from, to, prefix }: { from: number; to: number, prefix: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView && ref.current) {
      const controls = animate(from, to, {
        duration: 1.5,
        onUpdate(value) {
          if (ref.current) {
            ref.current.textContent = prefix + value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          }
        },
      });
      return () => controls.stop();
    }
  }, [from, to, inView, prefix]);

  return <p ref={ref} className="text-2xl font-bold">{prefix}{from.toLocaleString()}</p>;
}


export function StatCards() {
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
                <Counter from={0} to={stat.value} prefix={stat.prefix} />
            </div>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
