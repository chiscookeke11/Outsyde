import httpx
import asyncio



WEATHER_URL = "https://api.open-meteo.com/v1/forecast"



async def get_weather(latitude: float, longitude: float):
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
        "forecast_days": 5,
        "timezone": "auto",
    }


    async with httpx.AsyncClient() as client:
        response = await client.get(
            WEATHER_URL,
            params=params,
            timeout=10
        )


    response.raise_for_status()

    return response.json()




# result = asyncio.run(get_weather(6.85783, 7.39577))
# print(result)