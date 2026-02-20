import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { DollarSign, Upload, CheckCircle, BarChart, Users, Zap, Award } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Testimonials } from '@/components/home/Testimonials';
import { AsibiFab } from '@/components/ai/AsibiFab';

export default function ForVendorsPage() {
    const heroImage = PlaceHolderImages.find(img => img.id === 'why-choose-us-1');

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative h-[60vh] min-h-[500px] w-full flex items-center justify-center text-center text-white">
                    {heroImage && (
                        <Image
                            src={heroImage.imageUrl}
                            alt={heroImage.description}
                            fill
                            className="object-cover"
                            data-ai-hint={heroImage.imageHint}
                            priority
                        />
                    )}
                    <div className="absolute inset-0 bg-black/60" />
                    <div className="relative z-10 p-4">
                        <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-extrabold">
                            Monetize Your Prime Ad Space
                        </h1>
                        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-neutral-200">
                            Join Ghana's largest billboard network and turn your locations into consistent revenue.
                        </p>
                        <div className="mt-8 flex justify-center gap-4">
                            <Button asChild size="lg">
                                <Link href="/signup">List Your Space Today</Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-foreground">
                                <Link href="#how-it-works">Learn More</Link>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section id="how-it-works" className="py-16 sm:py-24 bg-secondary/50 scroll-mt-20">
                    <div className="container mx-auto px-4">
                        <div className="text-center max-w-3xl mx-auto">
                            <h2 className="text-3xl sm:text-4xl font-bold">Earn More with a Simple Process</h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                                We make it easy to list your billboard and connect with advertisers.
                            </p>
                        </div>
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            <div className="flex flex-col items-center">
                                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mb-4">
                                    <Upload className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-bold">1. List Your Billboard</h3>
                                <p className="mt-2 text-muted-foreground">
                                    Use our simple form to upload billboard details, images, and set your pricing in minutes.
                                </p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mb-4">
                                    <CheckCircle className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-bold">2. Approve Bookings</h3>
                                <p className="mt-2 text-muted-foreground">
                                    Receive and manage booking requests from a wide range of advertisers directly from your dashboard.
                                </p>
                            </div>
                             <div className="flex flex-col items-center">
                                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mb-4">
                                    <DollarSign className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-bold">3. Get Paid Securely</h3>
                                <p className="mt-2 text-muted-foreground">
                                    Benefit from secure, automated payments directly to your account after a booking is confirmed.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                 <section className="py-16 sm:py-24 bg-background">
                    <div className="container mx-auto px-4">
                        <div className="text-center max-w-3xl mx-auto">
                            <h2 className="text-3xl sm:text-4xl font-bold">Why Partner with OwareAds?</h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                                We empower billboard owners with the tools and reach to maximize their revenue.
                            </p>
                        </div>
                        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                            <div className="flex gap-4">
                                <Users className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-lg font-bold">Access Premium Advertisers</h3>
                                    <p className="mt-1 text-muted-foreground">Connect with a broad network of local and international brands looking for prime ad space.</p>
                                </div>
                            </div>
                             <div className="flex gap-4">
                                <Zap className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-lg font-bold">Maximize Your Occupancy</h3>
                                    <p className="mt-1 text-muted-foreground">Reduce vacancies and ensure your billboards are generating revenue with our active marketplace.</p>
                                </div>
                            </div>
                             <div className="flex gap-4">
                                <BarChart className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-lg font-bold">Powerful Management Tools</h3>
                                    <p className="mt-1 text-muted-foreground">Use your vendor dashboard to manage listings, track bookings, and view performance analytics effortlessly.</p>
                                </div>
                            </div>
                             <div className="flex gap-4">
                                <CheckCircle className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-lg font-bold">Transparent Analytics</h3>
                                    <p className="mt-1 text-muted-foreground">Get clear insights into your billboard's performance, including views, clicks, and booking trends.</p>
                                </div>
                            </div>
                             <div className="flex gap-4">
                                <Award className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-lg font-bold">Dedicated Support</h3>
                                    <p className="mt-1 text-muted-foreground">Our team is here to help you with everything from listing your billboard to processing payments.</p>
                                </div>
                            </div>
                             <div className="flex gap-4">
                                <DollarSign className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-lg font-bold">Secure & Fast Payments</h3>
                                    <p className="mt-1 text-muted-foreground">Enjoy peace of mind with our reliable payment system that ensures you get paid on time, every time.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <Testimonials />

                {/* Final CTA */}
                <section className="py-16 sm:py-24 bg-primary/10">
                     <div className="container mx-auto px-4 text-center">
                          <h2 className="text-3xl sm:text-4xl font-bold">Ready to Boost Your Revenue?</h2>
                         <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                            Join our network of successful billboard owners today and start maximizing your earnings.
                         </p>
                         <div className="mt-8">
                             <Button asChild size="lg">
                                 <Link href="/signup">Become a Vendor</Link>
                             </Button>
                         </div>
                     </div>
                </section>
                <AsibiFab />
            </main>
            <Footer />
        </div>
    );
}
