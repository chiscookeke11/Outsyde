from fastapi import FastAPI

from app.core.config import settings
from app.api.routes.locations import router as location_router
from app.api.routes.weather import router as weather_router
from app.api.routes.searches import router as search_router
from app.api.routes.videos import router as videos_router
from app.api.routes.export import router as export_router


app = FastAPI(
    title = settings.app_name,
    app_version=settings.app_version,
    debug=settings.debug,
)


app.include_router(location_router)
app.include_router(weather_router)
app.include_router(search_router)
app.include_router(videos_router)
app.include_router(export_router)



@app.get("/health")
def health_check():
    return {
        "status": "ok"
    }




