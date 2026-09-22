"use client";

import { Bell, Search, Settings } from "lucide-react";

export default function Header() {
    return (
        <header className="flex h-20 items-center justify-between border-b border-neutral-200 bg-white px-6 lg:px-8">
            <div>
                <p className="text-sm text-neutral-500">
                    Good morning
                </p>

                <h2 className="text-xl font-semibold text-neutral-900">
                    Weather Dashboard
                </h2>
            </div>

            <div className="flex items-center gap-3">
                <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 text-neutral-600 hover:bg-neutral-50">
                    <Search size={18} />
                </button>

                <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 text-neutral-600 hover:bg-neutral-50">
                    <Bell size={18} />
                </button>

                <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 text-neutral-600 hover:bg-neutral-50">
                    <Settings size={18} />
                </button>
            </div>
        </header>
    );
}