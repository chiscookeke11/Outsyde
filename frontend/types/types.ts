export interface CurrentWeather {
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    precipitation: number;
    weather_code: number;
    wind_speed_10m: number;
}

export interface DailyWeather {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
    precipitation_sum: number[];
}

export interface WeatherResponse {
    current: CurrentWeather;
    daily: DailyWeather;
    timezone: string;
}


export interface LocationResult {
    name: string;
    country: string;
    admin1?: string;
    latitude: number;
    longitude: number;
    timezone?: string;
}

export interface LocationSearchResponse {
    query: string;
    results: LocationResult[];
}

export interface SavedLocation {
    id: number;
    name: string;
    country: string;
    latitude: number;
    longitude: number;
    created_at: string;
}


export interface WeatherSearch {
    id: number;
    location_id: number;
    start_date: string;
    end_date: string;
    weather_data: Record<string, unknown>;
    created_at: string;
}