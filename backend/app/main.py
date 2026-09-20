from fastapi import FastAPI

from app.core.config import settings
from app.api.routes.locations import router as location_router
from app.api.routes.weather import router as weather_router


app = FastAPI(
    title = settings.app_name,
    app_version=settings.app_version,
    debug=settings.debug,
)


app.include_router(location_router)
app.include_router(weather_router)



@app.get("/health")
def health_check():
    return {
        "status": "ok"
    }




