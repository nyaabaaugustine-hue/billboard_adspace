'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Calendar as CalendarIcon, Building, Search } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { BillboardType } from "@/lib/types";
import { Separator } from "../ui/separator";

const billboardTypes: BillboardType[] = ["Digital LED", "Gantry", "Unipole", "Wall"];

export interface SearchFilters {
  searchTerm: string;
  date: Date | undefined;
  type: string;
}

interface SmartSearchBarProps {
  onSearch: (filters: SearchFilters) => void;
}

export function SmartSearchBar({ onSearch }: SmartSearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState<Date | undefined>();
  const [type, setType] = useState("");

  const handleSearchClick = () => {
    onSearch({ searchTerm, date, type });
  };

  return (
    <div className="mt-4 w-full max-w-4xl">
      <div className="flex h-auto flex-col gap-2 rounded-lg bg-black/20 p-2 shadow-2xl backdrop-blur-md border border-white/20 md:h-16 md:flex-row md:gap-0">
        <div className="relative flex h-12 flex-grow items-center md:h-full">
          <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-300" />
          <Input
            type="text"
            placeholder="Search by city, region..."
            className="h-full w-full rounded-md border-none bg-transparent pl-12 text-base text-white placeholder:text-stone-300 focus-visible:ring-0 focus-visible:ring-offset-0 md:rounded-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Separator orientation="vertical" className="h-8 bg-white/20 hidden md:block" />

        <div className="relative flex h-12 items-center md:h-full md:w-48">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"ghost"}
                  className={cn(
                    "h-full w-full justify-start rounded-md border-none px-12 text-left text-base font-normal text-white hover:bg-black/20 focus-visible:ring-0 focus-visible:ring-offset-0 md:rounded-none",
                    !date && "text-stone-300"
                  )}
                >
                  <CalendarIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-300" />
                  {date ? format(date, "PPP") : <span>Date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
        </div>
        
        <Separator orientation="vertical" className="h-8 bg-white/20 hidden md:block" />
        
        <div className="relative flex h-12 items-center md:h-full md:w-48">
             <Building className="absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-stone-300" />
            <Select onValueChange={setType} value={type}>
                <SelectTrigger className="h-full w-full rounded-md border-none bg-transparent pl-12 text-base text-white hover:bg-black/20 data-[placeholder]:text-stone-300 focus-visible:ring-0 focus-visible:ring-offset-0 md:rounded-none">
                    <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {billboardTypes.map(bt => <SelectItem key={bt} value={bt}>{bt}</SelectItem>)}
                </SelectContent>
            </Select>
        </div>

        <Button type="submit" size="icon" className="h-12 w-full shrink-0 bg-primary md:ml-2 md:w-12" onClick={handleSearchClick}>
            <Search className="h-6 w-6 text-primary-foreground" />
        </Button>
      </div>
    </div>
  );
}
