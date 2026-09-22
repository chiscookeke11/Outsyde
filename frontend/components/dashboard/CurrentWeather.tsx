import { CloudSun, MapPin } from "lucide-react";
import { CurrentWeather as CurrentWeatherType } from "@/types/types";

interface Props {
    weather: CurrentWeatherType;
    location: string;
}

function getWeatherDescription(code: number) {
    if (code === 0) return "Clear sky";
    if ([1, 2, 3].includes(code)) return "Partly cloudy";
    if ([45, 48].includes(code)) return "Foggy";
    if ([51, 53, 55].includes(code)) return "Drizzle";
    if ([61, 63, 65].includes(code)) return "Rain";
    if ([71, 73, 75].includes(code)) return "Snow";
    if ([80, 81, 82].includes(code)) return "Rain showers";
    if ([95, 96, 99].includes(code)) return "Thunderstorm";

    return "Unknown";
}

export default function CurrentWeather({
    weather,
    location,
}: Props) {
    return (
        <section className="relative overflow-hidden rounded-3xl bg-neutral-900 p-7 text-white">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-sky-400/20 blur-3xl" />

            <div className="relative">
                <div className="flex items-center gap-2 text-sm text-neutral-300">
                    <MapPin size={16} />
                    {location}
                </div>

                <div className="mt-8 flex items-end justify-between">
                    <div>
                        <p className="text-sm text-neutral-400">
                            Current temperature
                        </p>

                        <div className="mt-2 flex items-start">
                            <span className="text-6xl font-semibold tracking-tight">
                                {Math.round(weather.temperature_2m)}
                            </span>

                            <span className="mt-2 text-2xl text-neutral-400">
                                °C
                            </span>
                        </div>

                        <p className="mt-3 text-base text-neutral-300">
                            {getWeatherDescription(weather.weather_code)}
                        </p>
                    </div>

                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10">
                        <CloudSun size={42} strokeWidth={1.5} />
                    </div>
                </div>

                <div className="mt-8 border-t border-white/10 pt-5">
                    <p className="text-sm text-neutral-400">
                        Feels like
                    </p>

                    <p className="mt-1 text-lg font-medium">
                        {Math.round(weather.apparent_temperature)}°C
                    </p>
                </div>
            </div>
        </section>
    );
}