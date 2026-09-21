from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_export_searches_json():
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

    response = client.get("/export/searches/json")

    assert response.status_code == 200
    assert response.headers["content-type"].startswith(
        "application/json"
    )

    data = response.json()

    assert isinstance(data, list)
    assert len(data) > 0

    exported_search = data[-1]

    assert exported_search["location_id"] == location["id"]
    assert exported_search["start_date"] == "2026-09-20"
    assert exported_search["end_date"] == "2026-09-24"
    assert "weather_data" in exported_search




def test_export_searches_csv():
    location_response = client.post(
        "/locations/",
        json={
            "name": "Abuja",
            "country": "Nigeria",
            "latitude": 9.0765,
            "longitude": 7.3986,
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

    response = client.get("/export/searches/csv")

    assert response.status_code == 200

    assert response.headers["content-type"].startswith(
        "text/csv"
    )

    assert "weather_searches.csv" in (
        response.headers["content-disposition"]
    )

    content = response.text

    assert "id,location_id,start_date,end_date,weather_data" in content
    assert "2026-09-20" in content
    assert "2026-09-24" in content