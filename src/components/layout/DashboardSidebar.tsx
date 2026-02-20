'use client';

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { OwareLogo } from "@/components/icons/OwareLogo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminMenu, vendorMenu, userMenu, adminProfile, vendorProfile, userProfile } from "@/config/dashboard-menus";
import type { Role } from "@/lib/roles";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ChevronRight } from "lucide-react";

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

  const getProfile = () => {
    switch(role) {
      case 'ADMIN':
        return adminProfile;
      case 'VENDOR':
        return vendorProfile;
      case 'USER':
        return userProfile;
      default:
        return userProfile;
    }
  }

  const menu = getMenu();
  const profile = getProfile();

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/" className="block">
          <OwareLogo />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {menu.map((group) => (
            <SidebarGroup key={group.title}>
                {group.title !== 'Menu' && <SidebarGroupLabel>{group.title}</SidebarGroupLabel>}
                <SidebarMenu>
                {group.items.map((item) => (
                    <SidebarMenuItem key={item.href}>
                    <Link href={item.href} className="w-full">
                        <SidebarMenuButton tooltip={item.tooltip} isActive={pathname === item.href}>
                        <item.icon />
                        <span>{item.label}</span>
                        </SidebarMenuButton>
                    </Link>
                    </SidebarMenuItem>
                ))}
                </SidebarMenu>
            </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        {role === 'ADMIN' ? (
            <Link href={profile.href} className="w-full p-2">
                <div className="flex items-center gap-2 p-2 rounded-md hover:bg-sidebar-accent">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src="https://randomuser.me/api/portraits/women/25.jpg" alt="Admin User" />
                        <AvatarFallback>AU</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left">
                        {/* @ts-ignore */}
                        <p className="text-sm font-semibold">{profile.label}</p>
                        {/* @ts-ignore */}
                        <p className="text-xs text-muted-foreground">{profile.description}</p>
                    </div>
                    <ChevronRight className="h-5 w-5" />
                </div>
            </Link>
        ) : (
            <SidebarMenu>
                <SidebarMenuItem>
                    <Link href={profile.href} className="w-full">
                        {/* @ts-ignore */}
                        <SidebarMenuButton tooltip={profile.tooltip}>
                             {/* @ts-ignore */}
                            <profile.icon />
                             {/* @ts-ignore */}
                            <span>{profile.label}</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
            </SidebarMenu>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
