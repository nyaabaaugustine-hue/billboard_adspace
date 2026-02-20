'use client';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { AsibiAssistant } from "./AsibiAssistant";

export function AsibiFab() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50" size="icon">
                    <Sparkles className="h-7 w-7" />
                    <span className="sr-only">Ask Asibi</span>
                </Button>
            </SheetTrigger>
            <SheetContent className="w-full max-w-md p-0 flex flex-col" side="right">
               <AsibiAssistant />
            </SheetContent>
        </Sheet>
    )
}
