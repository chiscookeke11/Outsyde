"use client";

import { useEffect, useState } from "react";



import { getWeather } from "@/lib/api";
import { WeatherResponse } from "@/types/types";
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

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState<string | null>(
        null
    );

    useEffect(() => {
        async function loadWeather() {
            try {
                const data = await getWeather(
                    6.5244,
                    3.3792
                );

                setWeather(data);
            } catch {
                setError("Unable to load weather data.");
            } finally {
                setLoading(false);
            }
        }

        loadWeather();
    }, []);

    return (
        <div className="min-h-screen bg-neutral-50">
            <div className="flex">
                <Sidebar />

                <div className="min-w-0 flex-1">
                    <Header />

                    <main className="px-6 py-8 lg:px-8">
                        <div className="mx-auto max-w-7xl">

                            {/* Search */}
                            <div className="mb-8">
                                <LocationSearch />
                            </div>

                            {loading && (
                                <div className="rounded-2xl border border-neutral-200 bg-white p-8">
                                    <p className="text-sm text-neutral-500">
                                        Loading weather...
                                    </p>
                                </div>
                            )}

                            {error && (
                                <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
                                    <p className="text-sm text-red-600">
                                        {error}
                                    </p>
                                </div>
                            )}

                            {weather && (
                                <div className="space-y-8">

                                    {/* Current Weather */}
                                    <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
                                        <CurrentWeather
                                            weather={weather.current}
                                            location="Lagos, Nigeria"
                                        />

                                        <WeatherMetrics
                                            weather={weather.current}
                                        />
                                    </div>

                                    {/* Forecast */}
                                    <Forecast
                                        daily={weather.daily}
                                    />

                                    {/* Insight */}
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
                    </main>
                </div>
            </div>
        </div>
    );
}