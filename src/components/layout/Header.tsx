"use client";

import Link from "next/link";
import { OwareLogo } from "@/components/icons/OwareLogo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const navLinks = [
  { href: "/billboards", label: "Browse Billboards" },
  { href: "/dashboard", label: "Dashboard" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <nav className="container flex h-20 items-center justify-between gap-4">
        <div className="hidden md:flex">
          <Link href="/" className="flex items-center">
            <OwareLogo className="h-8 w-8 text-primary" />
          </Link>
        </div>
        
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" asChild>
              <Link
                href="#"
                className="font-semibold text-base"
              >
                List a billboard
              </Link>
            </Button>
          <Button variant="ghost" asChild>
              <Link
                href="#"
                className="font-semibold text-base"
              >
                Login
              </Link>
            </Button>
          <Button size="lg" className="rounded-full font-bold text-base">Sign Up</Button>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between w-full">
            <Link href="/" className="flex items-center">
                <OwareLogo className="h-8 w-8 text-primary" />
            </Link>
            <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <Link href="/" className="flex items-center">
                  <OwareLogo className="h-8 w-8 text-primary" />
                </Link>
              </SheetHeader>
              <div className="mt-8 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-md p-2 text-lg font-medium hover:bg-muted"
                  >
                    {link.label}
                  </Link>
                ))}
                 <Button variant="ghost" asChild>
                    <Link
                        href="#"
                        className="rounded-md p-2 text-lg font-medium hover:bg-muted justify-start"
                    >
                        List a billboard
                    </Link>
                </Button>
                <Button className="mt-4 w-full text-lg h-12">Login</Button>
                <Button variant="secondary" className="mt-2 w-full text-lg h-12">Sign Up</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
