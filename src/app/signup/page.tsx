'use client';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { OwareLogo } from "@/components/icons/OwareLogo";
import { signInWithGoogle } from "@/firebase/auth/auth";
import { useUser } from "@/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";


const GoogleIcon = () => (
    <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
      <path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512 109.8 512 0 402.2 0 261.8 0 122.4 109.8 11.8 244 11.8c70.3 0 129.8 27.8 174.3 71.9l-64.8 64.8C322.8 113.2 286.1 97.4 244 97.4c-85.2 0-154.2 68.8-154.2 153.4s69 153.4 154.2 153.4c97.9 0 134.8-66.2 140.2-101.4H244v-79.2h244c2.8 13.9 4.1 28.5 4.1 44.1z"></path>
    </svg>
);

export default function SignupPage() {
  const bgImage = PlaceHolderImages.find((img) => img.id === "hero-1");
  const { user, loading } = useUser();
  const router = useRouter();
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard/user');
    }
  }, [user, loading, router]);

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    await signInWithGoogle();
    // The useEffect will handle the redirect
  };

  if (loading || (!loading && user)) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="relative flex-grow">
         {bgImage && (
          <Image
            src={bgImage.imageUrl}
            alt={bgImage.description}
            fill
            className="object-cover"
            data-ai-hint={bgImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex h-full items-center justify-center p-4">
            <Card className="w-full max-w-md">
              <CardHeader className="text-center">
                 <div className="mx-auto mb-4">
                    <OwareLogo />
                </div>
                <CardTitle className="text-2xl">Create an Account</CardTitle>
                <CardDescription>
                  Join our platform to start booking billboards today.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-1 gap-4">
                    <Button variant="outline" onClick={handleGoogleSignIn} disabled={isSigningIn}>
                        {isSigningIn ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <GoogleIcon />}
                        {isSigningIn ? 'Redirecting...' : 'Sign up with Google'}
                    </Button>
                </div>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
                    </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="full-name">Full Name</Label>
                  <Input id="full-name" placeholder="John Doe" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" required />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button className="w-full">Create account</Button>
                <p className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link href="/login" className="underline font-semibold text-foreground">
                    Login
                  </Link>
                </p>
              </CardFooter>
            </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
