'use client';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { AsibiAssistant } from "./AsibiAssistant";
import Image from 'next/image';

export function AsibiFab() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button 
                    className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg z-50 p-0 overflow-hidden border-2 border-primary/50 transition-transform hover:scale-110 focus:ring-2 focus:ring-ring focus:ring-offset-2" 
                    size="icon"
                >
                    <Image 
                        src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1771205327/straight_yqwg78.png" 
                        alt="Ask Asibi"
                        fill
                        className="object-cover"
                    />
                    <span className="sr-only">Ask Asibi</span>
                </Button>
            </SheetTrigger>
            <SheetContent className="w-full max-w-md p-0 flex flex-col" side="right">
               <AsibiAssistant />
            </SheetContent>
        </Sheet>
    )
}
