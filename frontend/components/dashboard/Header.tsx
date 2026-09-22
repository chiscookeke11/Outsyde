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

        </header>
    );
}