"use client";

import { useEffect, useState } from "react";



import { getWeather, searchLocations } from "@/lib/api";
import { LocationResult, WeatherResponse } from "@/types/types";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import LocationSearch from "@/components/dashboard/LocationSearch";
import CurrentWeather from "@/components/dashboard/CurrentWeather";
import WeatherMetrics from "@/components/dashboard/WeatherMetrics";
import Forecast from "@/components/dashboard/Forecast";
import OutdoorInsight from "@/components/dashboard/OutdoorInsight";




export default function DashboardPage() {
    const [weather, setWeather] =
        useState<WeatherResponse | null>(null);

    const [location, setLocation] =
        useState<LocationResult>({
            name: "Lagos",
            country: "Nigeria",
            latitude: 6.5244,
            longitude: 3.3792,
        });

    const [loading, setLoading] = useState(true);
    const [searching, setSearching] = useState(false);

    const [error, setError] =
        useState<string | null>(null);


    async function loadWeather(
        latitude: number,
        longitude: number
    ) {
        try {
            setLoading(true);
            setError(null);

            const data = await getWeather(
                latitude,
                longitude
            );

            setWeather(data);
        } catch (error) {
            console.error(error);

            setError(
                "Unable to load weather data."
            );
        } finally {
            setLoading(false);
        }
    }


    async function handleLocationSearch(
        query: string
    ) {
        try {
            setSearching(true);
            setError(null);

            const data = await searchLocations(query);

            if (!data.results || data.results.length === 0) {
                setError(
                    `No location found for "${query}".`
                );

                return;
            }

            const selectedLocation =
                data.results[0];

            setLocation(selectedLocation);

            await loadWeather(
                selectedLocation.latitude,
                selectedLocation.longitude
            );

        } catch (error) {
            console.error(error);

            setError(
                "Unable to search for this location."
            );
        } finally {
            setSearching(false);
        }
    }


    useEffect(() => {
        loadWeather(
            location.latitude,
            location.longitude
        );
    }, []);


    return (
        <div className="min-h-screen bg-neutral-50">


            <div className="mx-auto w-full ">

                {/* Search */}
                <div className="mb-8">
                    <LocationSearch
                        onSearch={handleLocationSearch}
                        loading={searching}
                    />
                </div>


                {/* Error */}
                {error && (
                    <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-5">
                        <p className="text-sm text-red-600">
                            {error}
                        </p>
                    </div>
                )}


                {/* Loading */}
                {loading && (
                    <div className="rounded-2xl border border-neutral-200 bg-white p-8">
                        <p className="text-sm text-neutral-500">
                            Loading weather...
                        </p>
                    </div>
                )}


                {/* Weather */}
                {weather && !loading && (
                    <div className="space-y-8">

                        <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">

                            <CurrentWeather
                                weather={weather.current}
                                location={`${location.name}, ${location.country}`}
                            />

                            <WeatherMetrics
                                weather={weather.current}
                            />

                        </div>


                        <Forecast
                            daily={weather.daily}
                        />


                        <OutdoorInsight
                            temperature={
                                weather.current.temperature_2m
                            }
                            precipitationProbability={
                                weather.daily
                                    .precipitation_probability_max[0]
                            }
                            windSpeed={
                                weather.current.wind_speed_10m
                            }
                        />

                    </div>
                )}

            </div>

        </div>
    );
}