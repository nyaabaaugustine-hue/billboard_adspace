import { Header } from "@/components/layout/Header";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { OwareLogo } from "@/components/icons/OwareLogo";
import {
  LayoutDashboard,
  Target,
  History,
  Heart,
  Settings,
  CreditCard,
  User,
} from "lucide-react";
import Link from "next/link";

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Sidebar>
          <SidebarHeader>
             <Link href="/" className="block">
                <OwareLogo />
             </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/user-dashboard" className="w-full">
                  <SidebarMenuButton tooltip="Dashboard">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="#" className="w-full">
                  <SidebarMenuButton tooltip="Active Campaigns">
                    <Target />
                    <span>Active Campaigns</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                 <Link href="#" className="w-full">
                    <SidebarMenuButton tooltip="Booking History">
                      <History />
                      <span>Booking History</span>
                    </SidebarMenuButton>
                 </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                 <Link href="#" className="w-full">
                    <SidebarMenuButton tooltip="Saved Billboards">
                      <Heart />
                      <span>Saved Billboards</span>
                    </SidebarMenuButton>
                 </Link>
              </SidebarMenuItem>
               <SidebarMenuItem>
                 <Link href="#" className="w-full">
                    <SidebarMenuButton tooltip="Payments">
                      <CreditCard />
                      <span>Payments</span>
                    </SidebarMenuButton>
                 </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <Link href="#" className="w-full">
                        <SidebarMenuButton tooltip="Profile & Settings">
                            <User />
                            <span>Profile</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <Header />
          <main className="p-4 sm:p-6 lg:p-8">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
