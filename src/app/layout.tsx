import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Alegreya, Belleza } from "next/font/google";

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
  title: "OwareAds - Ghana's Billboard & Advertising Ecosystem",
  description:
    "Rent billboards, book advertising services, and grow your business with OwareAds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          href="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1771617987/cv_euqiu3.png"
          sizes="any"
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-body antialiased",
          belleza.variable,
          alegreya.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
