'use client';

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { OwareLogo } from "@/components/icons/OwareLogo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminMenu, vendorMenu, userMenu } from "@/config/dashboard-menus";
import type { Role } from "@/lib/roles";
import { Settings } from "lucide-react";

export function DashboardSidebar() {
  const pathname = usePathname();

  const getRole = (): Role => {
    if (pathname.startsWith('/dashboard/admin')) return 'ADMIN';
    if (pathname.startsWith('/dashboard/vendor')) return 'VENDOR';
    if (pathname.startsWith('/dashboard/user')) return 'USER';
    return 'USER'; // Default role
  };

  const role = getRole();

  const getMenu = () => {
    switch (role) {
      case 'ADMIN':
        return adminMenu;
      case 'VENDOR':
        return vendorMenu;
      case 'USER':
        return userMenu;
      default:
        return userMenu;
    }
  };

  const menu = getMenu();
  const settingsLink = menu.find(item => item.isSetting) || { href: '#', tooltip: 'Settings', icon: Settings, label: 'Settings' };
  const mainMenuItems = menu.filter(item => !item.isSetting);

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/" className="block">
          <OwareLogo />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {mainMenuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} className="w-full">
                <SidebarMenuButton tooltip={item.tooltip}>
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href={settingsLink.href} className="w-full">
              <SidebarMenuButton tooltip={settingsLink.tooltip}>
                <settingsLink.icon />
                <span>{settingsLink.label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
