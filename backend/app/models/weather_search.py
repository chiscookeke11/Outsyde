from datetime import date, datetime

from sqlalchemy import Date, DateTime, ForeignKey, JSON
from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base



class WeatherSearch(Base):
    __tablename__ = "Weather_searches"


    id: Mapped[int] = mapped_column(
        primary_key = True,
        autoincrement = True
    )


    location_id: Mapped[int] = mapped_column(
        ForeignKey("locations.id"),
        nullable=False,
    )

    start_date: Mapped[date] = mapped_column(
        Date,
        nullable=False,
    )

    end_date: Mapped[date] = mapped_column(
        Date,
        nullable=False
    )

    weather_data: Mapped[dict] =  mapped_column(
        JSON,
        nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )
