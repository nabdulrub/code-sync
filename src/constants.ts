import {
  GalleryVerticalEnd,
  History,
  LayoutDashboard,
  Sparkles,
} from "lucide-react";
import { DashboardLinkProps } from "./components/dashboard/dashboard-side-navbar-link";

export const DASHBOARD_PATHS: DashboardLinkProps[] = [
  { href: "/dashboard", label: "Recent", icon: LayoutDashboard },
  { href: "/dashboard/recent", label: "Recent", icon: History },
  { href: "/dashboard/owned", label: "Owned", icon: GalleryVerticalEnd },
  { href: "/dashboard/ai", label: "AI", icon: Sparkles },
];
