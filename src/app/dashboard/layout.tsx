import { Header } from "@/components/layout/Header";
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
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <DashboardSidebar />
        <SidebarInset>
          <Header />
          <main className="p-4 sm:p-6 lg:p-8">{children}</main>
          <AsibiFab />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
