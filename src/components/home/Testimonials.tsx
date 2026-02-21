'use client';
import React, { useState } from 'react';
import { testimonials } from '@/lib/reviews';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Star, Quote, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
  } from '@/components/ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { AdspaceLogo } from '../icons/OwareLogo';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const GoogleIcon = () => (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25C22.56 11.42 22.49 10.62 22.35 9.84H12V14.48H18.19C17.93 16.03 17.07 17.34 15.82 18.22V20.73H19.46C21.45 18.91 22.56 15.93 22.56 12.25Z" fill="#4285F4"/>
        <path d="M12 23C15.14 23 17.74 21.95 19.46 20.73L15.82 18.22C14.75 18.93 13.45 19.34 12 19.34C9.12 19.34 6.66 17.44 5.79 14.9H2.1V17.49C3.82 20.7 7.62 23 12 23Z" fill="#34A853"/>
        <path d="M5.79 14.9C5.58 14.31 5.48 13.68 5.48 13C5.48 12.32 5.58 11.69 5.79 11.1L2.1 8.51C1.22 10.23 0.73 11.55 0.73 13C0.73 14.45 1.22 15.77 2.1 17.49L5.79 14.9Z" fill="#FBBC05"/>
        <path d="M12 6.66C13.57 6.66 14.94 7.21 16.03 8.24L19.52 4.75C17.73 3.03 15.14 2 12 2C7.62 2 3.82 4.3 2.1 7.49L5.79 9.99C6.66 7.56 9.12 6.66 12 6.66Z" fill="#EA4335"/>
    </svg>
);


function ReviewForm() {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setOpen(false);
        toast({
            title: "Review Submitted!",
            description: "Thank you for your feedback. We appreciate you taking the time to share your experience.",
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <GoogleIcon />
                    Write a review
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader className="text-center items-center">
                    <div className="mx-auto mb-4">
                        <AdspaceLogo />
                    </div>
                    <DialogTitle className="text-2xl">Write a review</DialogTitle>
                    <DialogDescription>
                        Share your experience with Adspace. Your feedback helps us improve.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-1 gap-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" placeholder="John Doe" required/>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                            <Label htmlFor="rating">Rating</Label>
                            <div className="flex items-center">
                                {[...Array(5)].map((star, index) => {
                                const ratingValue = index + 1;
                                return (
                                    <button
                                    type="button"
                                    key={index}
                                    className="bg-transparent border-none cursor-pointer"
                                    onClick={() => setRating(ratingValue)}
                                    onMouseEnter={() => setHover(ratingValue)}
                                    onMouseLeave={() => setHover(0)}
                                    >
                                    <Star
                                        className={cn(
                                        "h-6 w-6 transition-colors",
                                        ratingValue <= (hover || rating)
                                            ? "text-amber-400 fill-amber-400"
                                            : "text-muted-foreground/50"
                                        )}
                                    />
                                    </button>
                                );
                                })}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                            <Label htmlFor="review">Review</Label>
                            <Textarea id="review" placeholder="Tell us about your experience..." required />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Submit Review
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export function Testimonials() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <section className="bg-secondary/50 py-20 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            What Our Clients Say
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Trusted by leading brands and vendors across Ghana.
            </p>
        </div>

        <Carousel
          plugins={[plugin.current]}
          className="w-full mt-12"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                 <div className="p-1 h-full">
                    <Card className="h-full rounded-2xl shadow-sm">
                        <CardContent className="p-6 flex flex-col items-center text-center">
                            <Quote className="w-8 h-8 text-primary mb-4" />
                            <p className="text-muted-foreground flex-grow">&quot;{testimonial.comment}&quot;</p>
                            <div className="flex items-center mt-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`h-5 w-5 ${i < testimonial.rating ? 'fill-amber-400 text-amber-400' : 'fill-muted text-muted-foreground'}`}/>
                                ))}
                            </div>
                            <div className="mt-6 flex items-center">
                                <Image src={testimonial.avatar} alt={testimonial.name} width={48} height={48} className="rounded-full mr-4" data-ai-hint="person portrait" />
                                <div>
                                    <p className="font-semibold">{testimonial.name}</p>
                                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                 </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>

        <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className='flex items-center gap-2'>
                <p className="font-semibold">Google rating</p>
                <div className="flex items-center gap-1">
                    <span className="font-bold text-lg">4.9</span>
                    <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                    <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                    <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                    <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                    <Star className="h-5 w-5 fill-amber-400/50 text-amber-400/80" />
                </div>
                <p className="text-muted-foreground">(120+ reviews)</p>
            </div>
             <ReviewForm />
        </div>

      </div>
    </section>
  );
}
