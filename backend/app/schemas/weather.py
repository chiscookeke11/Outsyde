from datetime import date

from pydantic import BaseModel, Field




class WeatherSearchCreate(BaseModel):
    location_id: int
    start_date: date
    end_date: date



class WeatherSearchResponse(BaseModel):
    id: int
    location_id: int
    start_date: date
    end_date: date
    weather_data: dict

    model_config = {
        "from_attributes": True
    }


