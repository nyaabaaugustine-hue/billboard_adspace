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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, ChevronDown } from "lucide-react";
import { ThemeToggle } from "../theme-toggle";

const navLinks = [
  { href: "/billboards", label: "Browse Billboards" },
  { href: "#", label: "For Advertisers" },
  { href: "#", label: "For Vendors" },
];

const dashboardLinks = [
    { href: "/dashboard", label: "Admin Dashboard" },
    { href: "/vendor-dashboard", label: "Vendor Dashboard" },
    { href: "/user-dashboard", label: "User Dashboard" },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <nav className="container flex h-20 items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="items-center hidden md:flex">
            <OwareLogo />
          </Link>
          <div className="hidden md:flex items-center gap-2">
             {navLinks.map((link) => (
                <Button key={link.href} variant="ghost" asChild>
                    <Link href={link.href} className="font-semibold text-base">
                        {link.label}
                    </Link>
                </Button>
              ))}
          </div>
        </div>
        
        <div className="hidden items-center gap-2 md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="font-semibold text-base">
                Dashboards <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {dashboardLinks.map(link => (
                     <DropdownMenuItem key={link.href} asChild>
                        <Link href={link.href}>{link.label}</Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>

            <Button variant="outline" asChild>
              <Link href="#" className="font-semibold text-base">
                List a Billboard
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
          <Button size="lg" className="font-bold text-base rounded-md" asChild>
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
                      className="rounded-md p-2 text-base font-medium hover:bg-muted"
                    >
                      {link.label}
                    </Link>
                  ))}
                   {dashboardLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-md p-2 text-base font-medium hover:bg-muted"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Button variant="ghost" asChild>
                      <Link
                          href="#"
                          className="rounded-md p-2 text-base font-medium hover:bg-muted justify-start"
                      >
                          List a billboard
                      </Link>
                  </Button>
                  <Button asChild className="mt-4 w-full text-base h-12">
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button asChild variant="secondary" className="mt-2 w-full text-base h-12">
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
