'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Sparkles, Lightbulb, MapPin, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { aiCampaignLocationRecommender, type AiCampaignLocationRecommenderOutput } from '@/ai/flows/ai-campaign-location-recommender';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const recommenderFormSchema = z.object({
  targetAudience: z.string().min(10, { message: 'Please describe your target audience in more detail.' }),
  budget: z.string().min(3, { message: 'Please provide a budget (e.g., "low", "GH₵ 5000").' }),
  campaignGoals: z.string().min(10, { message: 'Please describe your campaign goals in more detail.' }),
});

type RecommenderFormValues = z.infer<typeof recommenderFormSchema>;

export default function NewCampaignPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<AiCampaignLocationRecommenderOutput | null>(null);

  const form = useForm<RecommenderFormValues>({
    resolver: zodResolver(recommenderFormSchema),
    defaultValues: {
      targetAudience: '',
      budget: '',
      campaignGoals: '',
    },
  });

  async function onSubmit(data: RecommenderFormValues) {
    setIsLoading(true);
    setRecommendation(null);
    try {
      const result = await aiCampaignLocationRecommender({
        targetAudience: data.targetAudience,
        budget: data.budget,
        campaignGoals: data.campaignGoals,
      });
      setRecommendation(result);
    } catch (error) {
      console.error('Error getting AI recommendation:', error);
      toast({
        variant: 'destructive',
        title: 'Recommendation Failed',
        description: 'There was a problem getting a recommendation. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight flex items-center gap-2">
          <Sparkles className="h-8 w-8 text-primary" />
          AI Campaign Location Recommender
        </h1>
        <p className="text-muted-foreground">
          Let Asibi, our AI assistant, help you find the perfect billboard locations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle>Describe Your Campaign</CardTitle>
                    <CardDescription>
                        Provide details about your campaign, and our AI will suggest the best spots.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="targetAudience"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Target Audience</FormLabel>
                                    <FormControl>
                                    <Textarea placeholder="e.g., University students, young professionals, families in Accra" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="budget"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Campaign Budget</FormLabel>
                                    <FormControl>
                                    <Input placeholder="e.g., Low, Medium, or GH₵5000-10000" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="campaignGoals"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Primary Goals</FormLabel>
                                    <FormControl>
                                    <Textarea placeholder="e.g., Increase brand awareness, drive foot traffic to a new store, promote an event" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={isLoading} className="w-full">
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Getting Recommendations...
                                    </>
                                ) : (
                                    'Generate Recommendations'
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-2">
           <Card className="min-h-[500px]">
                <CardHeader>
                    <CardTitle>AI Recommendations</CardTitle>
                    <CardDescription>
                        Based on your input, here are the top suggestions.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading && (
                        <div className="flex flex-col items-center justify-center text-center h-80">
                            <Bot className="h-16 w-16 text-primary/50 animate-bounce" />
                            <p className="mt-4 font-semibold">Asibi is thinking...</p>
                            <p className="text-muted-foreground text-sm">Analyzing locations and market data for you.</p>
                        </div>
                    )}
                    {recommendation && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-semibold text-lg mb-4">Recommended Locations</h3>
                                <div className="space-y-4">
                                    {recommendation.recommendedLocations.map((loc, index) => (
                                        <Card key={index} className="bg-secondary/50">
                                            <CardHeader>
                                                <div className="flex justify-between items-start">
                                                    <CardTitle className="text-xl flex items-center gap-2">
                                                        <MapPin className="h-5 w-5 text-primary" />
                                                        {loc.city}
                                                    </CardTitle>
                                                    <Badge>Score: {loc.suitabilityScore}/100</Badge>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-muted-foreground">{loc.reason}</p>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                            <Separator />
                            <div>
                               <Alert>
                                  <Lightbulb className="h-4 w-4" />
                                  <AlertTitle className="font-semibold">General Advice from Asibi</AlertTitle>
                                  <AlertDescription className="prose prose-sm dark:prose-invert">
                                    {recommendation.generalAdvice}
                                  </AlertDescription>
                                </Alert>
                            </div>
                        </div>
                    )}
                     {!isLoading && !recommendation && (
                         <div className="flex flex-col items-center justify-center text-center h-80 border-2 border-dashed rounded-lg">
                            <Sparkles className="h-12 w-12 text-muted-foreground/50" />
                            <p className="mt-4 text-muted-foreground">Your recommendations will appear here.</p>
                        </div>
                    )}
                </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
