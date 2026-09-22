const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export async function getWeather(
    latitude: number,
    longitude: number
) {
    const response = await fetch(
        `${API_URL}/weather/?latitude=${latitude}&longitude=${longitude}`,
        {
            cache: "no-store",
        }
    );

    if (!response.ok) {
        throw new Error("Unable to fetch weather data");
    }

    return response.json();
}