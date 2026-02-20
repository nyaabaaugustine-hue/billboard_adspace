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
      <div className="grid grid-cols-1 md:grid-cols-10 items-center gap-px rounded-md bg-background/80 backdrop-blur-md p-2 shadow-2xl border border-border">
        <div className="relative md:col-span-4">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by city, region or address..."
            className="h-14 w-full rounded-none bg-transparent pl-12 text-base border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="relative md:col-span-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"ghost"}
                  className={cn(
                    "h-14 w-full justify-start text-left font-normal pl-12 hover:bg-transparent text-base border-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
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
        
        <div className="relative md:col-span-3">
             <Building className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
            <Select onValueChange={setType} value={type}>
                <SelectTrigger className="h-14 w-full bg-transparent pl-12 text-base border-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none data-[placeholder]:text-muted-foreground">
                    <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {billboardTypes.map(bt => <SelectItem key={bt} value={bt}>{bt}</SelectItem>)}
                </SelectContent>
            </Select>
        </div>

        <div className="md:col-span-1 flex items-center justify-end h-14">
            <Button type="submit" size="icon" className="rounded-md bg-primary h-12 w-12 shrink-0" onClick={handleSearchClick}>
                <Search className="h-6 w-6 text-primary-foreground" />
            </Button>
        </div>
      </div>
    </div>
  );
}
