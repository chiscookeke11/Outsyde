import httpx

from app.core.config import settings



YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search"


async def search_youtube(query: str, max_results: int = 5):
    params = {
        "part": "snippet",
        "q": query,
        "type": "video",
        "maxResults": max_results,
        "key": settings.youtube_api_key
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(
            YOUTUBE_SEARCH_URL,
            params=params,
            timeout=10
        )


    response.raise_for_status()

    data = response.json()

    videos = []

    for item in data.get("items", []):
        videos.append({
            "video_id": item["id"]["videoId"],
            "title": item["snippet"]["title"],
            "description": item["snippet"]["description"],
            "channel": item["snippet"]["channelTitle"],
            "thumbnail": item["snippet"]["thumbnails"]["high"]["url"],
            "url": f"https://www.youtube.com/watch?v={item['id']['videoId']}",
        })

    return videos
