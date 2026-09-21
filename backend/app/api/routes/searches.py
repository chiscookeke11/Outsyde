from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import date


from app.database.dependencies import get_db
from app.models.location import Location
from app.models.weather_search import WeatherSearch
from app.schemas.weather import (
    WeatherSearchCreate,
    WeatherSearchResponse
)
from app.services.weather_service import get_weather



router = APIRouter(
    prefix="/searches",
    tags=["Weather Searches"]
)



@router.post(
    "/",
    response_model = WeatherSearchResponse,
)
async def create_weather_search(
    search: WeatherSearchCreate,
    db: Session = Depends(get_db)
):
    location = db.query(Location).filter(
        Location.id == search.location_id
    ).first()


    if not location:
        raise HTTPException(
            status_code=404,
            detail="Location not found",
        )



    if search.start_date > search.end_date:
        raise HTTPException(
            status_code= 400,
            detail="Start date cannot be after end date"
        )

    date_range = (
        search.end_date - search.start_date
    ).days + 1

    if date_range > 5:
        raise HTTPException(
            status_code=400,
            detail="Weather search cannot exceed 5 days"
        )


    weather_data= await get_weather(
        latitude=location.latitude,
        longitude=location.longitude,
        start_date=search.start_date,
        end_date=search.end_date,
    )


    new_search = WeatherSearch(
        location_id=location.id,
        start_date=search.start_date,
        end_date=search.end_date,
        weather_data=weather_data,
    )


    db.add(new_search)
    db.commit()
    db.refresh(new_search)


    return new_search


@router.get("/", response_model=list[WeatherSearchResponse])
def get_weather_searches(
    db: Session = Depends(get_db),
):
    return db.query(WeatherSearch).all()




@router.get("/{search_id}", response_model=WeatherSearchResponse)
def get_weather_search(
    search_id: int,
    db: Session = Depends(get_db),
):
    search = db.query(WeatherSearch).filter(
        WeatherSearch.id == search_id
    ).first()

    if not search:
        raise HTTPException(
            status_code=404,
            detail="Weather search not found",
        )

    return search








