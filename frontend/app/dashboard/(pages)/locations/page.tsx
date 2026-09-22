"use client";

import { useEffect, useState } from "react";
import {
    MapPin,
    Trash2,
    Navigation,
} from "lucide-react";



import {
    getLocations,
    deleteLocation,
} from "@/lib/api";
import { SavedLocation } from "@/types/types";




export default function LocationsPage() {
    const [locations, setLocations] = useState<SavedLocation[]>([]);


    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    async function loadLocations() {
        try {
            setLoading(true);

            const data = await getLocations();

            setLocations(data);
        } catch {
            setError("Unable to load saved locations.");
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        loadLocations();
    }, []);


    async function handleDelete(id: number) {
        try {
            await deleteLocation(id);

            setLocations((current) =>
                current.filter((location) => location.id !== id)
            );
        } catch {
            setError("Unable to delete location.");
        }
    }


    return (
        <div className="min-h-screen bg-neutral-50">
            {/* Saved locations */}
            <div>
                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-neutral-900">
                        Saved Locations
                    </h2>

                    <p className="text-sm text-neutral-500">
                        {locations.length} saved location
                        {locations.length !== 1 ? "s" : ""}
                    </p>
                </div>


                {loading ? (
                    <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-sm text-neutral-500">
                        Loading locations...
                    </div>
                ) : locations.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-10 text-center">
                        <MapPin
                            size={28}
                            className="mx-auto text-neutral-400"
                        />

                        <p className="mt-3 text-sm font-medium text-neutral-700">
                            No saved locations
                        </p>

                        <p className="mt-1 text-xs text-neutral-500">
                            Search for a location above and save it.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {locations.map((location) => (
                            <div
                                key={location.id}
                                className="rounded-2xl border border-neutral-200 bg-white p-5"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-500">
                                        <MapPin size={19} />
                                    </div>

                                    <button
                                        onClick={() =>
                                            handleDelete(location.id)
                                        }
                                        className="rounded-lg p-2 text-neutral-400 hover:bg-red-50 hover:text-red-500"
                                        title="Delete location"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>

                                <h3 className="mt-5 text-base font-semibold text-neutral-900">
                                    {location.name}
                                </h3>

                                <p className="mt-1 text-sm text-neutral-500">
                                    {location.country}
                                </p>

                                <div className="mt-5 flex items-center gap-2 text-xs text-neutral-400">
                                    <Navigation size={13} />

                                    {location.latitude.toFixed(4)},
                                    {" "}
                                    {location.longitude.toFixed(4)}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>


        </div>

    );
}