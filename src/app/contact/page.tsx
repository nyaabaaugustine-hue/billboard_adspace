import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AsibiFab } from '@/components/ai/AsibiFab';

export default function ContactPage() {
    const heroImage = PlaceHolderImages.find(img => img.id === 'why-choose-us-1');

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative h-[50vh] min-h-[400px] w-full flex items-center justify-center text-center text-white">
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
                            Get in Touch
                        </h1>
                        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-neutral-200">
                            We’re here to help. Have a question or want to start a project? Let us know.
                        </p>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="py-16 sm:py-24">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Contact Info */}
                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-3xl font-bold">Contact Information</h2>
                                    <p className="mt-2 text-muted-foreground">
                                        Fill out the form and our team will get back to you within 24 hours.
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <Mail className="h-6 w-6 text-primary" />
                                        <a href="mailto:contact@adspace.com" className="text-lg hover:text-primary">contact@adspace.com</a>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Phone className="h-6 w-6 text-primary" />
                                        <a href="tel:+233241234567" className="text-lg hover:text-primary">+233 24 123 4567</a>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <MapPin className="h-6 w-6 text-primary mt-1" />
                                        <p className="text-lg">
                                            123 Adspace Lane,<br />
                                            East Legon, Accra,<br />
                                            Ghana
                                        </p>
                                    </div>
                                </div>
                                <div className="aspect-video w-full rounded-xl overflow-hidden mt-8">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127063.14917173266!2d-0.2796035061614761!3d5.627794939766099!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9b86d9966c55%3A0x4c2e6423b00693a4!2sAccra!5e0!3m2!1sen!2sgh!4v1678886472453!5m2!1sen!2sgh"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen={false}
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Google Map of Accra"
                                    ></iframe>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div>
                                <Card>
                                    <CardContent className="p-6 sm:p-8">
                                        <h3 className="text-2xl font-bold mb-4">Send us a Message</h3>
                                        <form action="#" className="space-y-6">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <Label htmlFor="name">Full Name</Label>
                                                    <Input id="name" placeholder="John Doe" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="email">Email Address</Label>
                                                    <Input id="email" type="email" placeholder="you@example.com" />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="subject">Subject</Label>
                                                <Input id="subject" placeholder="Booking Inquiry" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="message">Message</Label>
                                                <Textarea id="message" placeholder="Your message here..." rows={6} />
                                            </div>
                                            <Button type="submit" size="lg" className="w-full">
                                                <Send className="mr-2 h-5 w-5" />
                                                Send Message
                                            </Button>
                                        </form>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>
                <AsibiFab />
            </main>
            <Footer />
        </div>
    );
}
