'use client';
import { useState } from "react";
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { SheetHeader, SheetTitle, SheetDescription } from "../ui/sheet";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Send, Loader2, User } from "lucide-react";
import { asibiAssistant } from "@/ai/flows/asibi-assistant-flow";
import { Role } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useUser } from "@/firebase";

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'asibi';
}

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="whatsapp"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 .2c24.7 0 49.4 9.5 67.6 27.7 18.2 18.2 27.6 42.9 27.6 67.6s-9.5 49.4-27.7 67.6c-18.3 18.3-43 27.7-67.6 27.7-24.7 0-49.4-9.5-67.6-27.7-18.2-18.2-27.6-42.9-27.6-67.6s9.5-49.4 27.7-67.6c18.2-18.2 42.9-27.6 67.6-27.6zM223.9 439.7c-33.8 0-66.3-8.8-94.3-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
      ></path>
    </svg>
);

export function AsibiAssistant() {
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: "Hello! I'm Asibi, your AI assistant. How can I help you today? You can ask me about billboards, vendors, or campaign strategies.", sender: 'asibi'}
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const pathname = usePathname();
    const { user } = useUser();
    const asibiAvatarUrl = "https://res.cloudinary.com/dwsl2ktt2/image/upload/v1771168493/eds_bjytks.png";

    const getRole = (): Role => {
        if (pathname.startsWith('/dashboard/admin')) return 'ADMIN';
        if (pathname.startsWith('/dashboard/vendor')) return 'VENDOR';
        if (pathname.startsWith('/dashboard/user')) return 'USER';
        return 'USER'; // Default role
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage: Message = { id: Date.now().toString(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const userRole = getRole();
            const response = await asibiAssistant({ 
                query: input, 
                userRole,
                userId: user?.uid 
            });
            const asibiMessage: Message = { id: (Date.now() + 1).toString(), text: response, sender: 'asibi' };
            setMessages(prev => [...prev, asibiMessage]);
        } catch (error) {
            console.error("Error calling Asibi assistant:", error);
            const errorMessage: Message = { id: (Date.now() + 1).toString(), text: "Sorry, I'm having trouble connecting right now. Please try again later.", sender: 'asibi' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <SheetHeader className="p-4 border-b">
                <div className="flex items-center gap-3">
                     <Image 
                        src={asibiAvatarUrl}
                        alt="Asibi Assistant"
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                    <div>
                        <SheetTitle className="text-xl">Asibi Assistant</SheetTitle>
                        <SheetDescription>Your AI-powered guide to Adspace</SheetDescription>
                    </div>
                </div>
            </SheetHeader>
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-6">
                    {messages.map((message) => (
                        <div key={message.id} className={cn("flex gap-3", message.sender === 'user' ? "justify-end" : "justify-start")}>
                            {message.sender === 'asibi' && (
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={asibiAvatarUrl} alt="Asibi" />
                                    <AvatarFallback>A</AvatarFallback>
                                </Avatar>
                            )}
                            <div className={cn(
                                "max-w-xs rounded-2xl p-3 text-sm prose dark:prose-invert",
                                message.sender === 'user' 
                                    ? "bg-primary text-primary-foreground rounded-br-none" 
                                    : "bg-muted rounded-bl-none"
                            )}>
                                <p dangerouslySetInnerHTML={{ __html: message.text.replace(/\n/g, '<br />') }} />
                            </div>
                            {message.sender === 'user' && (
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback>
                                        <User className="h-5 w-5" />
                                    </AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                    ))}
                    {isLoading && (
                         <div className="flex gap-3 justify-start">
                             <Avatar className="h-8 w-8">
                                <AvatarImage src={asibiAvatarUrl} alt="Asibi" />
                                <AvatarFallback>A</AvatarFallback>
                            </Avatar>
                            <div className="bg-muted rounded-2xl rounded-bl-none p-3 flex items-center">
                                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                            </div>
                        </div>
                    )}
                </div>
            </ScrollArea>
            <div className="p-4 border-t bg-background">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about billboards, trends..." 
                        className="flex-1"
                        disabled={isLoading}
                    />
                    <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                        <Send className="h-5 w-5" />
                    </Button>
                </form>
                <Button asChild className="w-full mt-2 bg-[#25D366] text-black font-bold hover:bg-[#20b358]">
                    <Link href="https://wa.me/233541988383" target="_blank" rel="noopener noreferrer">
                        <WhatsAppIcon className="h-5 w-5 mr-2" />
                        Chat with us on WhatsApp
                    </Link>
                </Button>
            </div>
        </>
    )
}
