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
import { ThemeToggle } from "../theme-toggle";

const navLinks = [
  { href: "/billboards", label: "Browse Billboards" },
  { href: "#", label: "For Advertisers" },
  { href: "#", label: "For Vendors" },
  { href: "/dashboard", label: "Dashboard" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <nav className="container flex h-20 items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="items-center hidden md:flex">
            <OwareLogo />
          </Link>
          <div className="hidden md:flex items-center gap-2">
             {navLinks.slice(0,3).map((link) => (
                <Button key={link.href} variant="ghost" asChild>
                    <Link href={link.href} className="font-semibold text-base">
                        {link.label}
                    </Link>
                </Button>
              ))}
          </div>
        </div>
        
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" asChild>
              <Link
                href="/dashboard"
                className="font-semibold text-base"
              >
                Dashboard
              </Link>
            </Button>
          <Button variant="ghost" asChild>
              <Link
                href="/login"
                className="font-semibold text-base"
              >
                Login
              </Link>
            </Button>
          <Button size="lg" className="font-bold text-base" asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
          <ThemeToggle />
        </div>

        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between w-full">
            <Link href="/" className="flex items-center">
                <OwareLogo />
            </Link>
            <div className="flex items-center gap-2">
              <ThemeToggle />
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
                    <OwareLogo />
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
                  <Button asChild className="mt-4 w-full text-lg h-12">
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button asChild variant="secondary" className="mt-2 w-full text-lg h-12">
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
