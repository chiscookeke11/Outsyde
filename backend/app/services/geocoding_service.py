import httpx
import asyncio


GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search"


async def geocode_location(query: str):
    params = {
        "name": query,
        "count": 1,
        "language": "en",
        "format": "json"
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(
            GEOCODING_URL,
            params=params,
            timeout=30,
        )

    response.raise_for_status()

    data = response.json()

    results = data.get("results", [])

    if not results:
        return None

    result = results[0]

    return {
        "name": result["name"],
        "country": result.get("country", ""),
        "latitude": result["latitude"],
        "longitude": result["longitude"]
    }


# result = asyncio.run(geocode_location("nsukka"))
# print(result)

