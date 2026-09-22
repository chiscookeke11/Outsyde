import csv
import io
import json

from fastapi.responses import StreamingResponse
from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.models.weather_search import WeatherSearch


router = APIRouter(
    prefix="/export",
    tags=["Export"],
)


@router.get("/searches/json")
def export_searches_json(
    db: Session = Depends(get_db),
):
    searches = db.query(WeatherSearch).all()

    data = [
        {
            "id": search.id,
            "location_id": search.location_id,
            "start_date": search.start_date.isoformat(),
            "end_date": search.end_date.isoformat(),
            "weather_data": search.weather_data,
        }
        for search in searches
    ]

    return StreamingResponse(
        iter([json.dumps(data, default=str, indent=2)]),
        media_type="application/json",
        headers={
            "Content-Disposition": "attachment; filename=weather_searches.json"
        },
    )



@router.get("/searches/csv")
def export_searches_csv(
    db: Session = Depends(get_db),
):
    searches = db.query(WeatherSearch).all()

    output = io.StringIO()

    writer = csv.writer(output)

    writer.writerow([
        "id",
        "location_id",
        "start_date",
        "end_date",
        "weather_data",
    ])

    for search in searches:
        writer.writerow([
            search.id,
            search.location_id,
            search.start_date.isoformat(),
            search.end_date.isoformat(),
            search.weather_data,
        ])

    output.seek(0)

    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={
            "Content-Disposition": (
                "attachment; filename=weather_searches.csv"
            )
        },
    )