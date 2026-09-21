from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)

def test_videos_endpoint():
    response = client.get(
        "/videos/",
        params={
            "query": "Lagos weather",
            "max_results": 5,
        },
    )


    assert response.status_code == 200

    data = response.json()

    assert data["query"] == "Lagos weather"
    assert "videos" in data
    assert isinstance(data["videos"], list)