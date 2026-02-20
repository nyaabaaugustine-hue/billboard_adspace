'use client';
import { usePathname } from 'next/navigation';
import { Header } from "@/components/layout/Header";
import { Footer } from '@/components/layout/Footer';
import {
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { AsibiFab } from "@/components/ai/AsibiFab";

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
      <div className="min-h-screen bg-background">
        <DashboardSidebar />
        <SidebarInset>
          <Header />
          <div className="flex-1 p-4 sm:p-6 lg:p-8">{children}</div>
          <AsibiFab />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
