from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_get_weather_searches():
    response = client.get("/searches/")

    assert response.status_code == 200

    data = response.json()

    assert isinstance(data, list)


def test_get_weather_search():
    location_response = client.post(
        "/locations/",
        json={
            "name": "Lagos",
            "country": "Nigeria",
            "latitude": 6.5244,
            "longitude": 3.3792,
        },
    )

    assert location_response.status_code == 200

    location = location_response.json()

    search_response = client.post(
        "/searches/",
        json={
            "location_id": location["id"],
            "start_date": "2026-09-20",
            "end_date": "2026-09-24",
        },
    )

    assert search_response.status_code == 200

    search = search_response.json()

    response = client.get(
        f"/searches/{search['id']}"
    )

    assert response.status_code == 200

    data = response.json()

    assert data["id"] == search["id"]
    assert data["location_id"] == location["id"]


def test_get_weather_search_not_found():
    response = client.get("/searches/999999")

    assert response.status_code == 404

    assert response.json()["detail"] == (
        "Weather search not found"
    )