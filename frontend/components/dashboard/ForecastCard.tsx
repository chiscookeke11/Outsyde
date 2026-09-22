import {
    Cloud,
    CloudRain,
    CloudSun,
    Sun,
    Umbrella,
} from "lucide-react";

interface Props {
    date: string;
    weatherCode: number;
    maxTemperature: number;
    minTemperature: number;
    precipitationProbability: number;
}

function getWeatherIcon(code: number) {
    if (code === 0) return Sun;

    if ([1, 2, 3].includes(code)) {
        return CloudSun;
    }

    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) {
        return CloudRain;
    }

    if ([95, 96, 99].includes(code)) {
        return Umbrella;
    }

    return Cloud;
}

export default function ForecastCard({
    date,
    weatherCode,
    maxTemperature,
    minTemperature,
    precipitationProbability,
}: Props) {
    const Icon = getWeatherIcon(weatherCode);

    const formattedDate = new Date(date).toLocaleDateString(
        "en-US",
        {
            weekday: "short",
            month: "short",
            day: "numeric",
        }
    );

    return (
        <div className="min-w-[145px] flex-1 rounded-2xl border border-neutral-200 bg-white p-5">
            <p className="text-xs font-medium text-neutral-500">
                {formattedDate}
            </p>

            <div className="my-6 flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-500">
                <Icon size={25} strokeWidth={1.7} />
            </div>

            <div className="flex items-end gap-2">
                <span className="text-xl font-semibold text-neutral-900">
                    {Math.round(maxTemperature)}°
                </span>

                <span className="text-sm text-neutral-400">
                    {Math.round(minTemperature)}°
                </span>
            </div>

            <p className="mt-3 text-xs text-sky-600">
                {precipitationProbability}% rain
            </p>
        </div>
    );
}