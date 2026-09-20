from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)

def test_weather_endpoint():
    response = client.get(
        "/weather/",
        params={
            "latitude": 6.5244,
            "longitude": 3.3792,
        },
    )


    assert response.status_code == 200

    data = response.json()

    assert "current" in data
    assert "daily" in data
    assert len(data["daily"]["time"]) == 5