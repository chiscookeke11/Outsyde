"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, CalendarDays } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";



import { getSearch } from "@/lib/api";
import { WeatherSearch } from "@/types/types";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";



export default function SearchDetailsPage() {
    const params = useParams();

    const [search, setSearch] =
        useState<WeatherSearch | null>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] =
        useState<string | null>(null);


    useEffect(() => {
        async function loadSearch() {
            try {
                const id = Number(params.id);

                const data = await getSearch(id);

                setSearch(data);
            } catch {
                setError("Unable to load this saved search.");
            } finally {
                setLoading(false);
            }
        }

        loadSearch();
    }, [params.id]);


    return (
        <div className="min-h-screen bg-neutral-50">
            <div className="flex">

                <Sidebar />

                <div className="min-w-0 flex-1">
                    <Header />

                    <main className="px-6 py-8 lg:px-8">
                        <div className="mx-auto max-w-5xl">

                            <Link
                                href="/searches"
                                className="mb-6 inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900"
                            >
                                <ArrowLeft size={16} />
                                Back to searches
                            </Link>


                            {loading && (
                                <div className="rounded-2xl border border-neutral-200 bg-white p-8">
                                    Loading search...
                                </div>
                            )}


                            {error && (
                                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                                    {error}
                                </div>
                            )}


                            {search && (
                                <div className="space-y-6">

                                    <div className="rounded-3xl bg-neutral-900 p-7 text-white">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                                            <CalendarDays size={22} />
                                        </div>

                                        <h1 className="mt-6 text-2xl font-semibold">
                                            Saved Weather Search
                                        </h1>

                                        <p className="mt-2 text-sm text-neutral-400">
                                            Location #{search.location_id}
                                        </p>

                                        <div className="mt-6 flex gap-8">
                                            <div>
                                                <p className="text-xs text-neutral-400">
                                                    Start date
                                                </p>

                                                <p className="mt-1 text-sm font-medium">
                                                    {search.start_date}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-neutral-400">
                                                    End date
                                                </p>

                                                <p className="mt-1 text-sm font-medium">
                                                    {search.end_date}
                                                </p>
                                            </div>
                                        </div>
                                    </div>


                                    <div>
                                        <h2 className="mb-4 text-lg font-semibold text-neutral-900">
                                            Weather Data
                                        </h2>

                                        <pre className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white p-6 text-xs leading-6 text-neutral-700">
                                            {JSON.stringify(
                                                search.weather_data,
                                                null,
                                                2
                                            )}
                                        </pre>
                                    </div>

                                </div>
                            )}

                        </div>
                    </main>
                </div>

            </div>
        </div>
    );
}