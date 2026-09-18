from fastapi.testclient import TestClient
from app.main import app


client = TestClient(app)




# testing create locations
def test_create_lcoation():
    response = client.post(
        "/locations/",
        json={
            "name": "Lagos",
            "country": "Nigeria",
            "latitude": 6.5244,
            "longitude": 3.3792
        },
    )


    assert response.status_code == 200

    data = response.json()

    assert data["name"] == "Lagos"
    assert data["country"] == "Nigeria"
    assert data["latitude"] == 6.5244
    assert data["longitude"] == 3.3792

    return data["id"]





# Testing get locations
def test_get_locations():
    response = client.get("/locations/")

    assert response.status_code == 200
    assert isinstance(response.json(), list)





# Testing invalid locations
def test_create_invalid_location():
    response = client.post(
        "/locations/",
        json={
            "name": "Lagos",
            "country": "Nigeria",
            "latitude": 100,
            "longitude": 3.3792,
        },
    )

    assert response.status_code == 422


