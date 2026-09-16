import pytest
from pydantic import ValidationError

from app.schemas.location import LocationCreate

def test_valid_location():
    location = LocationCreate(
        name="Lagos",
        country="Nigeria",
        latitude=6.5244,
        longitude=3.3792
    )

    assert location.name == "Lagos"



def test_invalid_latitude():
    with pytest.raises(ValidationError):
        LocationCreate(
            name="Lagos",
            country="Nigeria",
            latitude=100,
            longitude=3.3792
        )