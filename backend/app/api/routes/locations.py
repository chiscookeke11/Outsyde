from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.models.location import Location
from app.schemas.location import LocationCreate, LocationResponse



router = APIRouter(
    prefix="/locations",
    tags=["Locations"],
)



# Adding a location to the db
@router.post("/", response_model=LocationResponse)
def create_location(
    location: LocationCreate,
    db: Session = Depends(get_db)
):

    new_location = Location(
        name=location.name,
        country=location.country,
        latitude=location.latitude,
        longitude=location.longitude
    )

    db.add(new_location)
    db.commit()
    db.refresh(new_location)

    return new_location




# Getting a all Location from the db
@router.get("/", response_model=list[LocationResponse])
def get_locations(db: Session = Depends(get_db)):
    return db.query(Location).all()



@router.get("/search")
async def search_location(query: str):
    try:
        location = await search_location_by_name(query)
        return location
    except Exception as e:
        raise HTTPException(
            status_code=502,
            detail=f"Unable to search for location: {str(e)}"
        )



# getting a particular location from the db
@router.get("/{location_id}", response_model=LocationResponse)
def get_location(location_id: int, db:Session = Depends(get_db)):
    location = db.query(Location).filter(
        Location.id == location_id
    ).first()


    if not location:
        raise HTTPException(
            status_code = 404,
            detail = "Location not found",
        )

    return location




# updating a location in the db
@router.put("/{location_id}", response_model=LocationResponse)
def update_location(
    location_id: int,
    location_data: LocationCreate,
    db: Session = Depends(get_db),
):
    location = db.query(Location).filter(
        Location.id == location_id
    ).first()

    if not location:
        raise HTTPException(
            status_code = 404,
            detail = "Location not found",
        )


    location.name = location_data.name,
    location.country = location_data.country,
    location.latitude = location_data.latitude,
    location.longitude = location_data.longitude

    db.commit()
    db.refresh(location)

    return location



# deleting a location from the db
@router.delete("/{location_id}")
def delete_location(
    location_id: int,
    db: Session = Depends(get_db),
):
    location = db.query(Location).filter(
        Location.id == location_id
    ).first()

    if not location:
        raise HTTPException (
            status_code = 404,
            detail = "Location not found",
        )

    db.delete(location)
    db.commit()

    return {
        "message": "Location deleted successfully"
    }