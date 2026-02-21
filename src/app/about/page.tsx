
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Handshake, Lightbulb, Rocket, Target } from 'lucide-react';
import { AsibiFab } from '@/components/ai/AsibiFab';

const team = [
    {
        name: 'Van X Allotey',
        role: 'Founder & CEO',
        bio: 'The visionary behind Adspace, passionate about transforming outdoor advertising in Ghana with technology.',
        avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
        avatarFallback: 'VA',
    },
    {
        name: 'Augustine Nyaaba',
        role: 'Chief Technology Officer',
        bio: 'The architect of our robust platform, ensuring a seamless and secure experience for all users.',
        avatarUrl: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1771669466/20230526_112001_v382je.jpg',
        avatarFallback: 'AN',
    },
];

const values = [
    {
        icon: Lightbulb,
        title: 'Innovation',
        description: 'We are constantly pushing the boundaries of technology to simplify and enhance the advertising experience.',
    },
    {
        icon: Handshake,
        title: 'Partnership',
        description: 'We believe in building strong, collaborative relationships with advertisers and vendors for mutual success.',
    },
    {
        icon: Target,
        title: 'Impact',
        description: 'Our goal is to empower businesses of all sizes to make a tangible impact through effective outdoor advertising.',
    },
    {
        icon: Rocket,
        title: 'Growth',
        description: 'We are committed to fueling the growth of our partners and the brands that trust our platform.',
    },
];

export default function AboutUsPage() {
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
                            About Adspace
                        </h1>
                        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-neutral-200">
                            Revolutionizing outdoor advertising in Ghana, one billboard at a time.
                        </p>
                    </div>
                </section>

                {/* Our Mission & Vision Section */}
                <section className="py-16 sm:py-24 bg-secondary/50">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div className="prose dark:prose-invert max-w-none">
                                <h2 className="text-3xl sm:text-4xl font-bold">Our Mission</h2>
                                <p className="text-lg text-muted-foreground">
                                    To democratize outdoor advertising by creating an accessible, transparent, and efficient ecosystem that empowers Ghanaian businesses to connect with their audiences and enables property owners to maximize their assets.
                                </p>
                            </div>
                            <div className="prose dark:prose-invert max-w-none">
                                <h2 className="text-3xl sm:text-4xl font-bold">Our Vision</h2>
                                <p className="text-lg text-muted-foreground">
                                    To become the undisputed digital backbone of outdoor advertising in Africa, fostering economic growth and innovation by connecting every brand to its perfect audience through our intelligent, data-driven platform.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="py-16 sm:py-24">
                    <div className="container mx-auto px-4">
                        <div className="text-center max-w-3xl mx-auto">
                            <h2 className="text-3xl sm:text-4xl font-bold">Meet the Team</h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                                We are a team of innovators, marketers, and tech enthusiasts dedicated to your success.
                            </p>
                        </div>
                        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                            {team.map((member) => (
                                <div key={member.name} className="text-center flex flex-col items-center">
                                    <Avatar className="h-32 w-32 mb-4 border-4 border-primary/20">
                                        <AvatarImage src={member.avatarUrl} alt={member.name} data-ai-hint="person portrait"/>
                                        <AvatarFallback>{member.avatarFallback}</AvatarFallback>
                                    </Avatar>
                                    <h3 className="text-xl font-bold">{member.name}</h3>
                                    <p className="text-primary font-semibold">{member.role}</p>
                                    <p className="mt-2 text-muted-foreground max-w-xs">{member.bio}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                
                {/* Core Values Section */}
                 <section className="py-16 sm:py-24 bg-secondary/50">
                    <div className="container mx-auto px-4">
                        <div className="text-center max-w-3xl mx-auto">
                            <h2 className="text-3xl sm:text-4xl font-bold">Our Core Values</h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                                The principles that guide every decision we make.
                            </p>
                        </div>
                        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                            {values.map((value) => (
                                <div key={value.title} className="flex flex-col items-center text-center">
                                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mb-4">
                                        <value.icon className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-lg font-bold">{value.title}</h3>
                                    <p className="mt-1 text-muted-foreground">{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-16 sm:py-24 bg-primary/10">
                     <div className="container mx-auto px-4 text-center">
                          <h2 className="text-3xl sm:text-4xl font-bold">Join Our Journey</h2>
                         <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                            Whether you're an advertiser, a vendor, or an investor, we're building the future of outdoor media together.
                         </p>
                         <div className="mt-8 flex flex-wrap justify-center gap-4">
                             <Button asChild size="lg">
                                 <Link href="/billboards">Find Billboards</Link>
                             </Button>
                              <Button asChild variant="outline" size="lg">
                                 <Link href="/for-vendors">Become a Vendor</Link>
                             </Button>
                             <Button asChild size="lg" variant="secondary">
                                 <Link href="#">Join Our Management</Link>
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
