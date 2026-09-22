import ForecastCard from "./ForecastCard";
import { DailyWeather } from "@/types/types";

interface Props {
    daily: DailyWeather;
}

export default function Forecast({ daily }: Props) {
    return (
        <section>
            <div className="mb-4">
                <h2 className="text-lg font-semibold text-neutral-900">
                    5-Day Forecast
                </h2>

                <p className="text-sm text-neutral-500">
                    Plan ahead with the upcoming weather conditions.
                </p>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2">
                {daily.time.map((date, index) => (
                    <ForecastCard
                        key={date}
                        date={date}
                        weatherCode={daily.weather_code[index]}
                        maxTemperature={
                            daily.temperature_2m_max[index]
                        }
                        minTemperature={
                            daily.temperature_2m_min[index]
                        }
                        precipitationProbability={
                            daily.precipitation_probability_max[index]
                        }
                    />
                ))}
            </div>
        </section>
    );
}