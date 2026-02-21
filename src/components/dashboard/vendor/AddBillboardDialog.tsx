'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

import type { BillboardStatus, BillboardType } from '@/lib/types';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { AdspaceLogo } from '@/components/icons/OwareLogo';
import { useUser, useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ToastAction } from '@/components/ui/toast';
import { regions } from '@/lib/data';
import { ScrollArea } from '@/components/ui/scroll-area';

const billboardTypes: BillboardType[] = ["Unipole", "Gantry", "Wall", "Digital LED"];
const billboardStatuses: BillboardStatus[] = ["Available", "On Hold", "Rented"];

const billboardSchema = z.object({
    title: z.string().min(5, { message: 'Title must be at least 5 characters.' }),
    type: z.enum(billboardTypes, { required_error: 'Please select a billboard type.' }),
    size: z.string().regex(/^\d+m x \d+m$/, { message: 'Size must be in the format "12m x 6m".' }),
    sides: z.coerce.number().min(1, { message: 'Must have at least 1 side.' }),
    lighting: z.boolean().default(false),
    status: z.enum(billboardStatuses, { required_error: 'Please select a status.' }),
    regionId: z.string({ required_error: 'Please select a region.' }),
    city: z.string().min(2, { message: 'City is required.' }),
    address: z.string().min(10, { message: 'Address is required.' }),
    latitude: z.coerce.number().min(-90).max(90),
    longitude: z.coerce.number().min(-180).max(180),
    pricePerMonth: z.coerce.number().min(1, { message: 'Price must be a positive number.' }),
    trafficEstimate: z.coerce.number().min(0, { message: 'Traffic estimate cannot be negative.' }),
    visibilityScore: z.coerce.number().min(1).max(10),
    imageUrl: z.string().url({ message: 'Please enter a valid image URL.' }),
});

type BillboardFormValues = z.infer<typeof billboardSchema>;

export function AddBillboardDialog() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const { user } = useUser();
  const firestore = useFirestore();
  const router = useRouter();

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(billboardSchema),
    defaultValues: {
        title: '',
        size: '12m x 6m',
        sides: 1,
        lighting: false,
        city: '',
        address: '',
        latitude: 5.6179,
        longitude: -0.1185,
        pricePerMonth: 1000,
        trafficEstimate: 50000,
        visibilityScore: 7,
        imageUrl: 'https://picsum.photos/seed/new-board/600/400',
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(data: BillboardFormValues) {
    if (!user) {
        toast({
            variant: 'destructive',
            title: 'Authentication Required',
            description: 'You must be logged in to add a billboard.',
            action: (
              <ToastAction altText="Login" onClick={() => router.push('/login')}>
                Login
              </ToastAction>
            ),
        });
        return;
    }

    try {
        const billboardsCol = collection(firestore, 'billboards');

        await addDoc(billboardsCol, {
            ...data,
            vendorId: user.uid,
            isDigital: data.type === 'Digital LED',
            isActive: true,
            createdAt: serverTimestamp(),
        });
        
        setOpen(false);
        form.reset();

        toast({
            title: 'Billboard Added!',
            description: `Your new billboard "${data.title}" has been successfully listed.`,
        });

    } catch (error) {
        console.error("Error creating billboard:", error);
        toast({
            variant: 'destructive',
            title: 'Submission Failed',
            description: 'There was a problem adding your billboard. Please try again later.',
        });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Billboard
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl bg-card">
        <DialogHeader>
          <div className="mx-auto mb-4">
            <AdspaceLogo />
          </div>
          <DialogTitle className="text-2xl font-bold text-center">
            List a New Billboard
          </DialogTitle>
          <DialogDescription className="text-center">
            Fill in the details below to add a new billboard to the platform.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <ScrollArea className="h-96 w-full pr-6">
                <div className="space-y-4">
                    <FormField control={form.control} name="title" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Billboard Title</FormLabel>
                            <FormControl><Input placeholder="e.g. Spintex Road Digital Display" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="type" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl><SelectTrigger><SelectValue placeholder="Select a type" /></SelectTrigger></FormControl>
                                    <SelectContent>
                                        {billboardTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="status" render={({ field }) => (
                             <FormItem>
                                <FormLabel>Status</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl><SelectTrigger><SelectValue placeholder="Select a status" /></SelectTrigger></FormControl>
                                    <SelectContent>
                                        {billboardStatuses.map(status => <SelectItem key={status} value={status}>{status}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>

                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField control={form.control} name="size" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Size</FormLabel>
                                <FormControl><Input placeholder="12m x 6m" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="sides" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Sides</FormLabel>
                                <FormControl><Input type="number" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="lighting" render={({ field }) => (
                            <FormItem className="flex flex-col rounded-lg border p-3 justify-center">
                                <FormLabel>Lighting</FormLabel>
                                <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                            </FormItem>
                        )} />
                    </div>

                    <FormField control={form.control} name="address" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Address</FormLabel>
                            <FormControl><Input placeholder="e.g. Spintex Road, near Flower Pot" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <FormField control={form.control} name="regionId" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Region</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl><SelectTrigger><SelectValue placeholder="Select a region" /></SelectTrigger></FormControl>
                                    <SelectContent>
                                        {regions.map(region => <SelectItem key={region.id} value={region.id}>{region.name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )} />
                         <FormField control={form.control} name="city" render={({ field }) => (
                            <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl><Input placeholder="e.g. Accra" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="latitude" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Latitude</FormLabel>
                                <FormControl><Input type="number" step="any" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="longitude" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Longitude</FormLabel>
                                <FormControl><Input type="number" step="any" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>

                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField control={form.control} name="pricePerMonth" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price/Month (GH₵)</FormLabel>
                                <FormControl><Input type="number" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="trafficEstimate" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Daily Traffic Est.</FormLabel>
                                <FormControl><Input type="number" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="visibilityScore" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Visibility (1-10)</FormLabel>
                                <FormControl><Input type="number" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                     <FormField control={form.control} name="imageUrl" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image URL</FormLabel>
                            <FormControl><Input placeholder="https://..." {...field} /></FormControl>
                            <FormDescription>Link to a high-quality image of the billboard.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>
            </ScrollArea>
            <DialogFooter className="pt-4">
              <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Add Billboard
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
