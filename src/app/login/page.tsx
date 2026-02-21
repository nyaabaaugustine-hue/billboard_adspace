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
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { OwareLogo } from "@/components/icons/OwareLogo";
import { signInWithGoogle, signInUserWithEmailAndPassword, getFirebaseAuthErrorMessage } from "@/firebase/auth/auth";
import { useUser } from "@/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from "@/hooks/use-toast";

const GoogleIcon = () => (
    <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
      <path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512 109.8 512 0 402.2 0 261.8 0 122.4 109.8 11.8 244 11.8c70.3 0 129.8 27.8 174.3 71.9l-64.8 64.8C322.8 113.2 286.1 97.4 244 97.4c-85.2 0-154.2 68.8-154.2 153.4s69 153.4 154.2 153.4c97.9 0 134.8-66.2 140.2-101.4H244v-79.2h244c2.8 13.9 4.1 28.5 4.1 44.1z"></path>
    </svg>
);

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});


export default function LoginPage() {
  const bgImage = PlaceHolderImages.find((img) => img.id === "hero-1");
  const { user, loading: userLoading } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (!userLoading && user) {
      router.push('/dashboard/user');
    }
  }, [user, userLoading, router]);

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
        await signInWithGoogle();
        // On success, the useEffect hook will handle redirection.
    } catch(error: any) {
        const errorMessage = getFirebaseAuthErrorMessage(error);
        if (errorMessage) {
            toast({
                variant: 'destructive',
                title: 'Sign In Failed',
                description: errorMessage,
            });
        }
        setIsGoogleLoading(false);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsEmailLoading(true);
    try {
      await signInUserWithEmailAndPassword(values.email, values.password);
      // On success, the useEffect hook will handle redirection.
    } catch (error: any) {
      const errorMessage = getFirebaseAuthErrorMessage(error);
       if (errorMessage) {
            toast({
                variant: 'destructive',
                title: 'Sign In Failed',
                description: errorMessage,
            });
        }
      setIsEmailLoading(false);
    }
  }

  const isLoading = userLoading || isGoogleLoading || isEmailLoading;

  if (userLoading || (!userLoading && user)) {
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
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        <div className="relative z-10 flex h-full items-center justify-center p-4">
          <Card className="w-full max-w-md bg-card/80 backdrop-blur-lg border-white/20">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4">
                <OwareLogo />
              </div>
              <CardTitle className="text-2xl">Welcome Back</CardTitle>
              <CardDescription>
                Sign in to access your dashboard and manage your campaigns.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
               <div className="grid grid-cols-1 gap-4">
                  <Button variant="outline" onClick={handleGoogleSignIn} disabled={isLoading}>
                    {isGoogleLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <GoogleIcon />}
                     {isGoogleLoading ? 'Signing in...' : 'Login with Google'}
                  </Button>
               </div>
               <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card/80 px-2 text-muted-foreground">Or continue with</span>
                  </div>
              </div>
              <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="m@example.com" {...field} disabled={isLoading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center">
                              <FormLabel>Password</FormLabel>
                              <Link href="#" className="ml-auto inline-block text-sm underline">Forgot your password?</Link>
                          </div>
                          <FormControl>
                            <Input type="password" {...field} disabled={isLoading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isEmailLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Sign in
                    </Button>
                  </form>
                </Form>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <p className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="underline font-semibold text-foreground">
                  Sign up
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
