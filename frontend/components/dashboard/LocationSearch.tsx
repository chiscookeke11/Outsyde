"use client";

import { Search, MapPin } from "lucide-react";
import { useState } from "react";

interface LocationSearchProps {
    onSearch?: (location: string) => void;
}

export default function LocationSearch({
    onSearch,
}: LocationSearchProps) {
    const [query, setQuery] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!query.trim()) return;

        onSearch?.(query.trim());
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-xl items-center gap-2 rounded-2xl border border-neutral-200 bg-white p-2 shadow-sm"
        >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-500">
                <MapPin size={18} />
            </div>

            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a city or location..."
                className="flex-1 bg-transparent px-2 text-sm outline-none placeholder:text-neutral-400"
            />

            <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800"
            >
                <Search size={16} />
                Search
            </button>
        </form>
    );
}