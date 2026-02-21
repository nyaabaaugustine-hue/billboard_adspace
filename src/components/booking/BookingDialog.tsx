'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format, addMonths } from 'date-fns';
import { Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

import type { Billboard } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { OwareLogo } from '../icons/OwareLogo';
import { useUser, useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ToastAction } from '@/components/ui/toast';

const bookingFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number with country code.' }),
  company: z.string().optional(),
  startDate: z.date({
    required_error: 'A start date is required.',
  }),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

export function BookingDialog({ billboard }: { billboard: Billboard }) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useUser();
  const firestore = useFirestore();
  const router = useRouter();

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
    },
  });

  useEffect(() => {
    // Pre-fill form when user object is available or dialog is opened
    if (open && user) {
      form.reset({
        name: user.displayName || '',
        email: user.email || '',
        phone: form.getValues('phone'), // Keep phone if already entered
        company: form.getValues('company'), // Keep company if already entered
        startDate: form.getValues('startDate'),
      });
    }
  }, [user, form, open]);

  async function onSubmit(data: BookingFormValues) {
    setIsSubmitting(true);
    
    if (!user) {
        toast({
            variant: 'destructive',
            title: 'Authentication Required',
            description: 'You must be logged in to submit a booking request.',
            action: (
              <ToastAction altText="Login" onClick={() => router.push('/login')}>
                Login
              </ToastAction>
            ),
        });
        setIsSubmitting(false);
        return;
    }

    try {
        const bookingsCol = collection(firestore, 'bookings');
        const endDate = addMonths(data.startDate, 1);

        const newBookingRef = await addDoc(bookingsCol, {
            userId: user.uid,
            billboardId: billboard.id,
            billboardTitle: billboard.title,
            startDate: data.startDate,
            endDate: endDate,
            amount: billboard.pricePerMonth,
            status: 'PENDING',
            createdAt: serverTimestamp(),
            customerDetails: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                company: data.company || '',
            }
        });

        // Add BOOKING_REQUESTED event
        const eventsCol = collection(firestore, 'events');
        await addDoc(eventsCol, {
            type: 'BOOKING_REQUESTED',
            userId: user.uid,
            entityId: newBookingRef.id,
            entityType: 'booking',
            timestamp: serverTimestamp(),
            details: {
                billboardTitle: billboard.title,
                billboardId: billboard.id,
                customerName: data.name
            }
        });
        
        setIsSubmitting(false);
        setOpen(false);
        form.reset();

        toast({
            title: 'Booking Request Sent!',
            description: `Your request for "${billboard.title}" has been received. Our team will contact you shortly to confirm.`,
        });

    } catch (error) {
        console.error("Error creating booking:", error);
        toast({
            variant: 'destructive',
            title: 'Submission Failed',
            description: 'There was a problem submitting your request. Please try again later.',
        });
        setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full lg:w-auto">Book Now</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] bg-card">
        <DialogHeader>
          <div className="mx-auto mb-4">
            <OwareLogo />
          </div>
          <DialogTitle className="text-2xl font-bold text-center">
            Book: {billboard.title}
          </DialogTitle>
          <DialogDescription className="text-center">
            Complete the form below to submit your booking request. We'll assume a 1-month duration for now.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="col-span-2 sm:col-span-1">
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="col-span-2 sm:col-span-1">
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+233 24 123 4567" {...field} />
                    </FormControl>
                    <FormDescription>
                      Use international format.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Company (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Company Inc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="col-span-2 flex flex-col">
                    <FormLabel>Requested Start Date</FormLabel>
                    <Popover modal={true}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date(new Date().setHours(0,0,0,0))
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit Request
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
