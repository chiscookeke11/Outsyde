from fastapi.testclient import TestClient
from app.main import app
from app.core.config import settings

from app.main import app

client = TestClient(app)


# Testing if the app actually starts
def test_health_check():
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {
        "status": "ok"
    }





# Testing if the app configuration works
def test_app_configuration():
    assert settings.app_name == "Outsyde API"
    assert settings.app_version == "1.0.0"
    assert settings.debug is True

