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
  { href: "/vendors", label: "Find Vendors" },
  { href: "/sme-packages", label: "For SMEs" },
  { href: "/dashboard", label: "Admin" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center">
          <OwareLogo className="h-8 w-8 text-primary" />
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Button key={link.href} variant="link" asChild>
              <Link
                href={link.href}
                className="text-base font-medium text-foreground/80 hover:text-primary"
              >
                {link.label}
              </Link>
            </Button>
          ))}
          <Button>Get Started</Button>
        </div>
        <div className="md:hidden">
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
                <Button className="mt-4 w-full">Get Started</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
