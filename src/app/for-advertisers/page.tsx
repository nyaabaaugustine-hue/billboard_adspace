import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle, Search, Calendar, Rocket, BarChart, Users, Zap, Award } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Testimonials } from '@/components/home/Testimonials';
import { AsibiFab } from '@/components/ai/AsibiFab';
import { ScrollingBillboards } from '@/components/shared/ScrollingBillboards';

export default function ForAdvertisersPage() {
    const heroImage = PlaceHolderImages.find(img => img.id === 'hero-1');

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
                            Reach Your Audience, Amplify Your Brand
                        </h1>
                        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-neutral-200">
                            The smartest way to book outdoor advertising in Ghana.
                        </p>
                        <div className="mt-8 flex justify-center gap-4">
                            <Button asChild size="lg">
                                <Link href="/billboards">Start Exploring</Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-foreground">
                                <Link href="/signup">Sign Up Free</Link>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section className="py-16 sm:py-24 bg-secondary/50">
                    <div className="container mx-auto px-4">
                        <div className="text-center max-w-3xl mx-auto">
                            <h2 className="text-3xl sm:text-4xl font-bold">A Simple Path to Impactful Advertising</h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                                We've streamlined the process of billboard advertising into three simple steps.
                            </p>
                        </div>
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            <div className="flex flex-col items-center">
                                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mb-4">
                                    <Search className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-bold">1. Discover</h3>
                                <p className="mt-2 text-muted-foreground">
                                    Use our powerful search, interactive map, and AI recommendations to find the perfect billboard for your campaign goals and budget.
                                </p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mb-4">
                                    <Calendar className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-bold">2. Book</h3>
                                <p className="mt-2 text-muted-foreground">
                                    Secure your desired locations and dates with our transparent and straightforward booking system.
                                </p>
                            </div>
                             <div className="flex flex-col items-center">
                                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mb-4">
                                    <Rocket className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-bold">3. Launch & Manage</h3>
                                <p className="mt-2 text-muted-foreground">
                                    Track your campaigns, manage bookings, and analyze performance from your all-in-one user dashboard.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Scrolling Billboards Section */}
                <section className="py-16 sm:py-24 bg-background">
                    <ScrollingBillboards />
                </section>

                {/* Features Section */}
                 <section className="py-16 sm:py-24 bg-background">
                    <div className="container mx-auto px-4">
                        <div className="text-center max-w-3xl mx-auto">
                            <h2 className="text-3xl sm:text-4xl font-bold">Tools Designed for Your Success</h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                                We provide everything you need to run successful outdoor advertising campaigns.
                            </p>
                        </div>
                        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                            <div className="flex gap-4">
                                <BarChart className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-lg font-bold">Data-Driven Insights</h3>
                                    <p className="mt-1 text-muted-foreground">Make informed decisions with reliable traffic estimates, visibility scores, and location data for every billboard.</p>
                                </div>
                            </div>
                             <div className="flex gap-4">
                                <Zap className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-lg font-bold">AI-Powered Recommendations</h3>
                                    <p className="mt-1 text-muted-foreground">Leverage Asibi, our AI assistant, to get campaign strategies and find billboards that match your target audience.</p>
                                </div>
                            </div>
                             <div className="flex gap-4">
                                <Users className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-lg font-bold">Verified Partner Network</h3>
                                    <p className="mt-1 text-muted-foreground">Connect seamlessly with trusted professionals for printing, installation, and permit acquisition.</p>
                                </div>
                            </div>
                             <div className="flex gap-4">
                                <Search className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-lg font-bold">Ghana's Largest Network</h3>
                                    <p className="mt-1 text-muted-foreground">Get access to an unparalleled inventory of premium billboard locations across all regions of Ghana.</p>
                                </div>
                            </div>
                             <div className="flex gap-4">
                                <Award className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-lg font-bold">Quality Assurance</h3>
                                    <p className="mt-1 text-muted-foreground">Every billboard on our platform is vetted for quality and compliance, ensuring your brand is represented perfectly.</p>
                                </div>
                            </div>
                             <div className="flex gap-4">
                                <CheckCircle className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-lg font-bold">Simplified Management</h3>
                                    <p className="mt-1 text-muted-foreground">From booking history to payment tracking, your dashboard provides a complete overview of all your advertising activities.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <Testimonials />

                {/* Final CTA */}
                <section className="relative py-16 sm:py-24">
                     <Image
                        src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1771613077/adfd_aiwbkv.jpg"
                        alt="Billboard on a highway"
                        fill
                        className="object-cover"
                        data-ai-hint="highway billboard"
                    />
                    <div className="absolute inset-0 bg-black/70" />
                     <div className="relative z-10 container mx-auto px-4 text-center text-white">
                          <h2 className="text-3xl sm:text-4xl font-bold">Ready to Make an Impact?</h2>
                         <p className="mt-4 text-lg text-neutral-200 max-w-2xl mx-auto">
                            Join hundreds of brands reaching thousands of customers daily. Find your perfect advertising space today.
                         </p>
                         <div className="mt-8">
                             <Button asChild size="lg">
                                 <Link href="/billboards">Browse Billboards Now</Link>
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
