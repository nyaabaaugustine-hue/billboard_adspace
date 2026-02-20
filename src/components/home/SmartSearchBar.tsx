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
      <div className="flex h-16 items-center rounded-md bg-black/20 backdrop-blur-md p-2 shadow-2xl border border-white/20">
        <div className="relative flex-grow h-full flex items-center">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-300" />
          <Input
            type="text"
            placeholder="Search by city, region..."
            className="h-full w-full bg-transparent text-white placeholder:text-stone-300 pl-12 text-base border-none rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Separator orientation="vertical" className="h-8 bg-white/20" />

        <div className="relative h-full flex items-center">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"ghost"}
                  className={cn(
                    "h-full w-48 justify-start text-left font-normal px-12 hover:bg-black/20 text-base border-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none text-white",
                    !date && "text-stone-300"
                  )}
                >
                  <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-300" />
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
        
        <Separator orientation="vertical" className="h-8 bg-white/20" />
        
        <div className="relative h-full flex items-center">
             <Building className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-300 z-10" />
            <Select onValueChange={setType} value={type}>
                <SelectTrigger className="h-full w-48 bg-transparent pl-12 text-base border-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none data-[placeholder]:text-stone-300 text-white hover:bg-black/20">
                    <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {billboardTypes.map(bt => <SelectItem key={bt} value={bt}>{bt}</SelectItem>)}
                </SelectContent>
            </Select>
        </div>

        <Button type="submit" size="icon" className="bg-primary h-12 w-12 shrink-0 ml-2" onClick={handleSearchClick}>
            <Search className="h-6 w-6 text-primary-foreground" />
        </Button>
      </div>
    </div>
  );
}
