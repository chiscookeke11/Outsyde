from pydantic import BaseModel, Field


class LocationCreate(BaseModel):
    name: str = Field(min_length=2, max_length=255)
    country: str = Field(min_length=2, max_length=255)
    latitude: float = Field(ge=-90, le=90)
    longitude: float = Field(ge=-180, le=180)



class LocationResponse(BaseModel):
    id: int
    name: str
    country: str
    latitude: float
    longitude: float


    model_config = {
        "from_attributes": True
    }

