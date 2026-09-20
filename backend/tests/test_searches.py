from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)



# Testing for search creation
def test_create_weather_search():
    location_response = client.post(
        "/locations",
        json={
            "name": "Lagos",
            "country": "Nigeria",
            "latitude": 6.5244,
            "longitude": 3.3792
        },
    )

    assert location_response.status_code == 200

    location = location_response.json()

    response = client.post(
        "/searches",
        json={
            "location_id": location["id"],
            "start_date": "2026-09-20",
            "end_date": "2026-09-24"
        }
    )


    assert response.status_code == 200

    data = response.json()

    assert data["location_id"] == location["id"]
    assert data["start_date"] == "2026-09-20"
    assert data["end_date"] == "2026-09-24"
    assert "weather_data" in data





#  Testing for invalid dates
def test_invalid_weather_search_dates():
    location_response = client.post(
        "/locations/",
        json={
            "name": "Abuja",
            "country": "Nigeria",
            "latitude": 9.0765,
            "longitude": 7.3986,
        },
    )

    location = location_response.json()

    response = client.post(
        "/searches/",
        json={
            "location_id": location["id"],
            "start_date": "2026-09-25",
            "end_date": "2026-09-20",
        },
    )

    assert response.status_code == 400






