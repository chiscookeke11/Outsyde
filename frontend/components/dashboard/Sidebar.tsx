"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    MapPin,
    CalendarDays,
    Search,
    Compass,
    Download,
    CloudSun,
} from "lucide-react";

const navigation = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        name: "Locations",
        href: "/locations",
        icon: MapPin,
    },
    {
        name: "Weather Planner",
        href: "/#",
        icon: CalendarDays,
    },
    {
        name: "Saved Searches",
        href: "/searches",
        icon: Search,
    },
    {
        name: "Discover",
        href: "#",
        icon: Compass,
    },
];

const secondaryNavigation = [
    {
        name: "Export",
        href: "/export",
        icon: Download,
    },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden min-h-screen w-64 border-r border-neutral-200 bg-white px-4 py-6 lg:flex lg:flex-col">
            {/* Logo */}
            <div className="mb-10 flex items-center gap-3 px-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500 text-white">
                    <CloudSun size={22} />
                </div>

                <div>
                    <h1 className="text-lg font-semibold tracking-tight">
                        Outsyde
                    </h1>

                    <p className="text-xs text-neutral-500">
                        Weather intelligence
                    </p>
                </div>
            </div>

            {/* Main navigation */}
            <div className="flex-1">
                <p className="mb-3 px-3 text-xs font-medium uppercase tracking-wider text-neutral-400">
                    Workspace
                </p>

                <nav className="space-y-1">
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        const active = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${active
                                    ? "bg-sky-50 font-medium text-sky-600"
                                    : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                                    }`}
                            >
                                <Icon size={18} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <p className="mb-3 mt-8 px-3 text-xs font-medium uppercase tracking-wider text-neutral-400">
                    Tools
                </p>

                <nav className="space-y-1">
                    {secondaryNavigation.map((item) => {
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-neutral-600 transition hover:bg-neutral-50 hover:text-neutral-900"
                            >
                                <Icon size={18} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Bottom */}
            <div className="rounded-2xl bg-neutral-50 p-4">
                <p className="text-sm font-medium text-neutral-900">
                    Plan better outdoors
                </p>

                <p className="mt-1 text-xs leading-5 text-neutral-500">
                    Use weather data to make better decisions for your day.
                </p>
            </div>
        </aside>
    );
}