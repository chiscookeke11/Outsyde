from fastapi import APIRouter, HTTPException, Query

from app.services.weather_service import get_weather


router = APIRouter(
    prefix="/weather",
    tags=["Weather"]
)


@router.get("/")
async def weather(
    latitude: float = Query(..., ge=-90, le=90),
    longitude: float = Query(..., ge=-180, le=180),
):
    try:
        weather_data = await get_weather(
            latitude=latitude,
            longitude=longitude
        )

        return weather_data

    except Exception:
        raise HTTPException(
            status_code=502,
            detail="Unable to fetch weather data"
        )