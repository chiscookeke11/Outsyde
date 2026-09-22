import {
    Droplets,
    Wind,
    CloudRain,
    Thermometer,
} from "lucide-react";

import { CurrentWeather } from "@/types/types";

interface Props {
    weather: CurrentWeather;
}

export default function WeatherMetrics({ weather }: Props) {
    const metrics = [
        {
            label: "Humidity",
            value: `${weather.relative_humidity_2m}%`,
            icon: Droplets,
        },
        {
            label: "Wind speed",
            value: `${weather.wind_speed_10m} km/h`,
            icon: Wind,
        },
        {
            label: "Precipitation",
            value: `${weather.precipitation} mm`,
            icon: CloudRain,
        },
        {
            label: "Feels like",
            value: `${Math.round(weather.apparent_temperature)}°C`,
            icon: Thermometer,
        },
    ];

    return (
        <div className="grid grid-cols-2 gap-4">
            {metrics.map((metric) => {
                const Icon = metric.icon;

                return (
                    <div
                        key={metric.label}
                        className="rounded-2xl border border-neutral-200 bg-white p-5"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-100 text-neutral-600">
                                <Icon size={17} />
                            </div>
                        </div>

                        <p className="mt-5 text-xs text-neutral-500">
                            {metric.label}
                        </p>

                        <p className="mt-1 text-lg font-semibold text-neutral-900">
                            {metric.value}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}