import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Alegreya, Belleza } from "next/font/google";
import { AppLoader } from "@/components/layout/AppLoader";
import { FirebaseClientProvider } from "@/firebase/client-provider";
import { GlobalEngagement } from "@/components/GlobalEngagement";

const belleza = Belleza({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-belleza",
});

const alegreya = Alegreya({
  subsets: ["latin"],
  variable: "--font-alegreya",
});

export const metadata: Metadata = {
  title: "Adspace - Ghana's Billboard & Advertising Ecosystem",
  description:
    "Rent billboards, book advertising services, and grow your business with Adspace.",
  icons: {
    icon: "https://res.cloudinary.com/dwsl2ktt2/image/upload/v1771669841/adspace_zcwlql.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-body antialiased",
          belleza.variable,
          alegreya.variable
        )}
      >
        <FirebaseClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <AppLoader>
              {children}
              <GlobalEngagement />
            </AppLoader>
            <Toaster />
          </ThemeProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
