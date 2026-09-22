"use client";

import { FormEvent, useState } from "react";

type WeatherResponse = {
  current?: {
    temperature_2m?: number;
    apparent_temperature?: number;
    relative_humidity_2m?: number;
    precipitation?: number;
    wind_speed_10m?: number;
  };
  current_units?: Record<string, string>;
  timezone?: string;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

function valueWithUnit(value: number | undefined, unit: string | undefined) {
  return value === undefined ? "—" : `${value}${unit ?? ""}`;
}

export default function WeatherExplorer() {
  const [latitude, setLatitude] = useState("51.5072");
  const [longitude, setLongitude] = useState("-0.1276");
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function getWeather(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({ latitude, longitude });
      const response = await fetch(`${API_BASE_URL}/weather/?${params}`);

      if (!response.ok) {
        throw new Error("The weather service could not return conditions for that location.");
      }

      setWeather((await response.json()) as WeatherResponse);
    } catch (requestError) {
      setWeather(null);
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to connect to the weather service.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  const current = weather?.current;
  const units = weather?.current_units;

  return (
    <section id="weather" className="bg-sky-100 px-[5%] py-20 font-uncut">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="font-modern_era_mono text-sm uppercase tracking-[0.2em]">Live conditions</p>
          <h2 className="mt-3 font-season-vf text-5xl">Check the weather anywhere.</h2>
          <p className="mt-4 max-w-xl text-lg">
            Enter coordinates to retrieve current conditions directly from the Outsyde API.
          </p>
          <form onSubmit={getWeather} className="mt-8 grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-semibold">
              Latitude
              <input aria-label="Latitude" className="rounded border border-black bg-white px-4 py-3 font-normal" max="90" min="-90" onChange={(event) => setLatitude(event.target.value)} required step="any" type="number" value={latitude} />
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold">
              Longitude
              <input aria-label="Longitude" className="rounded border border-black bg-white px-4 py-3 font-normal" max="180" min="-180" onChange={(event) => setLongitude(event.target.value)} required step="any" type="number" value={longitude} />
            </label>
            <button className="rounded bg-black px-5 py-3 text-white transition hover:bg-black/80 sm:col-span-2 disabled:cursor-wait disabled:opacity-60" disabled={isLoading} type="submit">
              {isLoading ? "Loading conditions…" : "Get live weather"}
            </button>
          </form>
          {error && <p className="mt-4 text-sm text-red-700" role="alert">{error}</p>}
        </div>

        <div aria-live="polite" className="min-h-72 rounded-3xl bg-[#17253a] p-8 text-white shadow-xl">
          {current ? (
            <>
              <p className="font-modern_era_mono text-sm uppercase tracking-[0.16em] text-sky-200">{weather?.timezone ?? "Current weather"}</p>
              <p className="mt-5 font-season-vf text-7xl">{valueWithUnit(current.temperature_2m, units?.temperature_2m)}</p>
              <p className="mt-2 text-lg text-sky-100">Feels like {valueWithUnit(current.apparent_temperature, units?.apparent_temperature)}</p>
              <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-white/25 pt-5 text-sm">
                <div><dt className="text-sky-200">Humidity</dt><dd className="mt-1 text-lg">{valueWithUnit(current.relative_humidity_2m, units?.relative_humidity_2m)}</dd></div>
                <div><dt className="text-sky-200">Wind</dt><dd className="mt-1 text-lg">{valueWithUnit(current.wind_speed_10m, units?.wind_speed_10m)}</dd></div>
                <div><dt className="text-sky-200">Rain</dt><dd className="mt-1 text-lg">{valueWithUnit(current.precipitation, units?.precipitation)}</dd></div>
              </dl>
            </>
          ) : (
            <div className="flex h-full min-h-56 items-center"><p className="max-w-sm text-xl text-sky-100">Your live weather results will appear here after you submit a location.</p></div>
          )}
        </div>
      </div>
    </section>
  );
}
