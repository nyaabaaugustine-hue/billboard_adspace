'use client';
import { useState } from "react";
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { SheetHeader, SheetTitle, SheetDescription } from "../ui/sheet";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Send, Loader2, User } from "lucide-react";
import { asibiAssistant } from "@/ai/flows/asibi-assistant-flow";
import { Role } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'asibi';
}

export function AsibiAssistant() {
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: "Hello! I'm Asibi, your AI assistant. How can I help you today? You can ask me about billboards, vendors, or campaign strategies.", sender: 'asibi'}
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const pathname = usePathname();
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
            const response = await asibiAssistant({ query: input, userRole });
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
            </div>
        </>
    )
}
