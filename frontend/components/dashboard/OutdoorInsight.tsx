import { Lightbulb } from "lucide-react";

interface Props {
    temperature: number;
    precipitationProbability: number;
    windSpeed: number;
}

export default function OutdoorInsight({
    temperature,
    precipitationProbability,
    windSpeed,
}: Props) {
    let message =
        "Conditions look reasonable for outdoor activities.";

    if (precipitationProbability >= 60) {
        message =
            "Rain is likely today. Consider carrying an umbrella or moving outdoor plans indoors.";
    } else if (windSpeed >= 30) {
        message =
            "Wind speeds are relatively high. Take extra care with outdoor activities.";
    } else if (temperature >= 32) {
        message =
            "Temperatures are high. Stay hydrated and consider avoiding prolonged outdoor activity during the hottest part of the day.";
    } else if (temperature <= 15) {
        message =
            "Temperatures are relatively cool. Consider an extra layer if you're heading outside.";
    }

    return (
        <section className="rounded-3xl border border-sky-100 bg-sky-50 p-6">
            <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-sky-500 shadow-sm">
                    <Lightbulb size={20} />
                </div>

                <div>
                    <p className="text-sm font-semibold text-neutral-900">
                        Outdoor Insight
                    </p>

                    <p className="mt-2 text-sm leading-6 text-neutral-600">
                        {message}
                    </p>
                </div>
            </div>
        </section>
    );
}