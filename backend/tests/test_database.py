from sqlalchemy import text, inspect

from app.database.connection import engine

# Testing the database connection
def test_database_connection():
    with engine.connect() as connection:
        result = connection.execute(text("SELECT 1"))

        assert result.scalar() == 1



#  testing that our tables exist
def test_database_tables_exist():
    inspector = inspect(engine)

    tables = inspector.get_table_names()

    assert "locations" in tables
    assert "Weather_searches" in tables
