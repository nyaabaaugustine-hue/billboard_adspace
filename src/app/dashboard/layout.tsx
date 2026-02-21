'use client';
import { usePathname } from 'next/navigation';
import { Header } from "@/components/layout/Header";
import { Footer } from '@/components/layout/Footer';
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { AsibiFab } from "@/components/ai/AsibiFab";
import { ThemeToggle } from '@/components/theme-toggle';
import { UserNav } from '@/components/layout/UserNav';

function DashboardHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-lg sm:px-6 lg:px-8">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <div className="flex w-full items-center justify-end gap-2">
        <ThemeToggle />
        <UserNav />
      </div>
    </header>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === '/dashboard') {
    return (
        <div className="flex min-h-screen flex-col bg-background">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
    );
  }

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <DashboardHeader />
        <div className="flex-1 p-4 sm:p-6 lg:p-8">{children}</div>
        <AsibiFab />
      </SidebarInset>
    </SidebarProvider>
  );
}
