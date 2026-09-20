import pytest

from app.services.weather_service import get_weather




@pytest.mark.anyio
async def test_get_weather():
    data = await get_weather(
        latitude= 6.5244,
        longitude= 3.3792
    )


    assert "current" in data
    assert "daily" in data
    assert len(data["daily"]["time"]) == 5
