import pytest
from datetime import date

from app.services.weather_service import get_weather




@pytest.mark.anyio
async def test_get_weather_with_date_range():
    data = await get_weather(
        latitude= 6.5244,
        longitude= 3.3792,
        start_date=date(2026, 9, 20),
        end_date=date(2026, 9, 24)
    )


    assert "current" in data
    assert "daily" in data
    assert len(data["daily"]["time"]) == 5
