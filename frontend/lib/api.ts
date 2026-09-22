const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";


async function handleResponse(response: Response) {
    if (!response.ok) {
        let message = "Something went wrong";

        try {
            const data = await response.json();
            message = data.detail || message;
        } catch {
            // Ignore JSON parsing errors
        }

        throw new Error(message);
    }

    return response.json();
}


// Weather
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

    return handleResponse(response);
}


// Location search
export async function searchLocations(query: string) {
    const response = await fetch(
        `${API_URL}/locations/search?query=${encodeURIComponent(query)}`,
        {
            cache: "no-store",
        }
    );

    return handleResponse(response);
}


// Get saved locations
export async function getLocations() {
    const response = await fetch(
        `${API_URL}/locations/`,
        {
            cache: "no-store",
        }
    );

    return handleResponse(response);
}


// Create location
export async function createLocation(location: {
    name: string;
    country: string;
    latitude: number;
    longitude: number;
}) {
    const response = await fetch(
        `${API_URL}/locations/`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(location),
        }
    );

    return handleResponse(response);
}


// Delete location
export async function deleteLocation(id: number) {
    const response = await fetch(
        `${API_URL}/locations/${id}`,
        {
            method: "DELETE",
        }
    );

    return handleResponse(response);
}


// Get saved searches
export async function getSearches() {
    const response = await fetch(
        `${API_URL}/searches/`,
        {
            cache: "no-store",
        }
    );

    return handleResponse(response);
}


// Get a single saved search
export async function getSearch(id: number) {
    const response = await fetch(
        `${API_URL}/searches/${id}`,
        {
            cache: "no-store",
        }
    );

    return handleResponse(response);
}


// Create saved search
export async function createSearch(data: {
    location_id: number;
    start_date: string;
    end_date: string;
}) {
    const response = await fetch(
        `${API_URL}/searches/`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    return handleResponse(response);
}