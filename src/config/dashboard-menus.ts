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
  Shield,
  Building,
  FileText,
  BookOpen,
  Bell,
  LifeBuoy,
  Activity,
  type LucideIcon,
} from "lucide-react";

export interface MenuItem {
    href: string;
    label: string;
    tooltip: string;
    icon: LucideIcon;
}

export interface MenuGroup {
    title: string;
    items: MenuItem[];
}

export const adminMenu: MenuGroup[] = [
    {
        title: "Dashboard",
        items: [
            { href: "/dashboard/admin", label: "Overview", tooltip: "Overview", icon: LayoutDashboard },
            { href: "#", label: "Analytics", tooltip: "Analytics", icon: LineChart },
        ]
    },
    {
        title: "Management",
        items: [
            { href: "#", label: "Moderation", tooltip: "Moderation", icon: Shield },
            { href: "#", label: "Users", tooltip: "Users", icon: Users },
            { href: "#", label: "Jobs", tooltip: "Jobs", icon: Briefcase },
            { href: "#", label: "Companies", tooltip: "Companies", icon: Building },
            { href: "#", label: "Website Content", tooltip: "Website Content", icon: FileText },
            { href: "#", label: "Blog", tooltip: "Blog", icon: BookOpen },
            { href: "#", label: "Financials", tooltip: "Financials", icon: CreditCard },
        ]
    },
    {
        title: "Platform",
        items: [
            { href: "#", label: "Settings", tooltip: "Settings", icon: Settings },
            { href: "#", label: "Notifications", tooltip: "Notifications", icon: Bell },
            { href: "#", label: "Support", tooltip: "Support", icon: LifeBuoy },
            { href: "#", label: "API Status", tooltip: "API Status", icon: Activity },
        ]
    }
];

export const vendorMenu: MenuGroup[] = [
    {
        title: "Menu",
        items: [
            { href: "/dashboard/vendor", label: "Dashboard", tooltip: "Dashboard", icon: LayoutDashboard },
            { href: "#", label: "My Billboards", tooltip: "My Billboards", icon: Megaphone },
            { href: "#", label: "Bookings", tooltip: "Bookings", icon: Briefcase },
            { href: "#", label: "Services", tooltip: "Services", icon: Wrench },
            { href: "#", label: "Payments", tooltip: "Payments", icon: CreditCard },
            { href: "#", label: "Reviews", tooltip: "Reviews", icon: Star },
        ]
    }
];

export const userMenu: MenuGroup[] = [
    {
        title: "Menu",
        items: [
            { href: "/dashboard/user", label: "Dashboard", tooltip: "Dashboard", icon: LayoutDashboard },
            { href: "#", label: "Active Campaigns", tooltip: "Active Campaigns", icon: Target },
            { href: "#", label: "Booking History", tooltip: "Booking History", icon: History },
            { href: "#", label: "Saved Billboards", tooltip: "Saved Billboards", icon: Heart },
            { href: "#", label: "Payments", tooltip: "Payments", icon: CreditCard },
        ]
    }
];


export const adminProfile = { href: "#", label: "Admin User", description: "Administrator", tooltip: "Profile" };
export const vendorProfile = { href: "#", label: "Settings", tooltip: "Settings", icon: Settings };
export const userProfile = { href: "#", label: "Profile", tooltip: "Profile & Settings", icon: User };
