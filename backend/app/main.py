from fastapi import FastAPI

from app.core.config import settings


app = FastAPI(
    title = settings.app_name,
    app_version=settings.app_version,
    debug=settings.debug,
)




@app.get("/health")
def health_check():
    return {
        "status": "ok"
    }


