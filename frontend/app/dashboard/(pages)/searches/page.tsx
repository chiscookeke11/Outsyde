"use client";

import { useEffect, useState } from "react";
import {
    Search,
    CalendarDays,
    MapPin,
    ArrowRight,
} from "lucide-react";

import Link from "next/link";
import { WeatherSearch } from "@/types/types";
import { getSearches } from "@/lib/api";




export default function SearchesPage() {
    const [searches, setSearches] = useState<WeatherSearch[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        async function loadSearches() {
            try {
                const data = await getSearches();

                setSearches(data);
            } catch {
                setError("Unable to load saved searches.");
            } finally {
                setLoading(false);
            }
        }

        loadSearches();
    }, []);


    function formatDate(date: string) {
        return new Date(date).toLocaleDateString(
            "en-US",
            {
                month: "short",
                day: "numeric",
                year: "numeric",
            }
        );
    }


    return (
        <div className="min-h-screen bg-neutral-50 w-full  ">




            <div className="mb-8 w-full">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-500">
                        <Search size={21} />
                    </div>

                    <div>
                        <h1 className="text-2xl font-semibold text-neutral-900">
                            Saved Searches
                        </h1>

                        <p className="mt-1 text-sm text-neutral-500">
                            Review weather searches you have saved.
                        </p>
                    </div>
                </div>
            </div>


            {error && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                    {error}
                </div>
            )}


            {loading ? (
                <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-sm text-neutral-500">
                    Loading saved searches...
                </div>
            ) : searches.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-10 text-center">
                    <Search
                        size={28}
                        className="mx-auto text-neutral-400"
                    />

                    <p className="mt-3 text-sm font-medium text-neutral-700">
                        No saved searches yet
                    </p>

                    <p className="mt-1 text-xs text-neutral-500">
                        Searches created from the weather planner will appear here.
                    </p>
                </div>
            ) : (
                <div className="space-y-3">
                    {searches.map((search) => (
                        <Link
                            key={search.id}
                            href={`/searches/${search.id}`}
                            className="group flex items-center justify-between rounded-2xl border border-neutral-200 bg-white p-5 transition hover:border-sky-200 hover:shadow-sm"
                        >
                            <div className="flex items-center gap-4">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-100 text-neutral-600">
                                    <CalendarDays size={19} />
                                </div>

                                <div>
                                    <div className="flex items-center gap-2">
                                        <MapPin
                                            size={14}
                                            className="text-sky-500"
                                        />

                                        <p className="text-sm font-semibold text-neutral-900">
                                            Location #{search.location_id}
                                        </p>
                                    </div>

                                    <p className="mt-1 text-xs text-neutral-500">
                                        {formatDate(search.start_date)}
                                        {" — "}
                                        {formatDate(search.end_date)}
                                    </p>
                                </div>

                            </div>

                            <ArrowRight
                                size={18}
                                className="text-neutral-400 transition group-hover:translate-x-1 group-hover:text-sky-500"
                            />
                        </Link>
                    ))}
                </div>
            )}

        </div>

    );
}