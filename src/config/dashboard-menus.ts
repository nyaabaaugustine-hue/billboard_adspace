import {
  LayoutDashboard,
  Megaphone,
  Briefcase,
  Users,
  Settings,
  CreditCard,
  LineChart,
  Target,
  History,
  Heart,
  User,
  Star,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export interface MenuItem {
    href: string;
    label: string;
    tooltip: string;
    icon: LucideIcon;
    isSetting?: boolean;
}

export const adminMenu: MenuItem[] = [
    { href: "/dashboard/admin", label: "Dashboard", tooltip: "Dashboard", icon: LayoutDashboard },
    { href: "#", label: "Billboards", tooltip: "Billboards", icon: Megaphone },
    { href: "#", label: "Bookings", tooltip: "Bookings", icon: Briefcase },
    { href: "#", label: "Vendors", tooltip: "Vendors", icon: Users },
    { href: "#", label: "Payments", tooltip: "Payments", icon: CreditCard },
    { href: "#", label: "Reports", tooltip: "Reports", icon: LineChart },
    { href: "#", label: "Settings", tooltip: "Settings", icon: Settings, isSetting: true },
];

export const vendorMenu: MenuItem[] = [
    { href: "/dashboard/vendor", label: "Dashboard", tooltip: "Dashboard", icon: LayoutDashboard },
    { href: "#", label: "My Billboards", tooltip: "My Billboards", icon: Megaphone },
    { href: "#", label: "Bookings", tooltip: "Bookings", icon: Briefcase },
    { href: "#", label: "Services", tooltip: "Services", icon: Wrench },
    { href: "#", label: "Payments", tooltip: "Payments", icon: CreditCard },
    { href: "#", label: "Reviews", tooltip: "Reviews", icon: Star },
    { href: "#", label: "Settings", tooltip: "Settings", icon: Settings, isSetting: true },
];

export const userMenu: MenuItem[] = [
    { href: "/dashboard/user", label: "Dashboard", tooltip: "Dashboard", icon: LayoutDashboard },
    { href: "#", label: "Active Campaigns", tooltip: "Active Campaigns", icon: Target },
    { href: "#", label: "Booking History", tooltip: "Booking History", icon: History },
    { href: "#", label: "Saved Billboards", tooltip: "Saved Billboards", icon: Heart },
    { href: "#", label: "Payments", tooltip: "Payments", icon: CreditCard },
    { href: "#", label: "Profile", tooltip: "Profile & Settings", icon: User, isSetting: true },
];
