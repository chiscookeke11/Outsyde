import httpx
import asyncio



WEATHER_URL = "https://api.open-meteo.com/v1/forecast"



async def get_weather(
    latitude: float,
    longitude: float,
    start_date: date | None = None,
    end_date: date | None = None
    ):
    params = {
        "latitude": latitude,
        "longitude": longitude,
        "current": [
            "temperature_2m",
            "relative_humidity_2m",
            "apparent_temperature",
            "precipitation",
            "weather_code",
            "wind_speed_10m",
        ],
        "daily": [
            "weather_code",
            "temperature_2m_max",
            "temperature_2m_min",
            "precipitation_probability_max",
            "precipitation_sum",
        ],
        "timezone": "auto",
    }


    if start_date and end_date:
        params["start_date"] = start_date.isoformat()
        params["end_date"] = end_date.isoformat()

    else:
        params["forcast_days"] = 5


    async with httpx.AsyncClient() as client:
        response = await client.get(
            WEATHER_URL,
            params=params,
            timeout=10
        )


    response.raise_for_status()

    data = response.json()

    if not start_date and not end_date:
        data["daily"]["time"] = data["daily"]["time"][:5]

        for key in data["daily"]:
            if isinstance(data["daily"][key], list):
                data["daily"][key] = data["daily"][key][:5]

    return data




# result = asyncio.run(get_weather(6.85783, 7.39577))
# print(result)