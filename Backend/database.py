import os

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


# db_url="postgresql://postgres:Vinay%401704@localhost:5432/auth_demo"
db_url = os.getenv("DATABASE_URL")

engine= create_engine(db_url)

print("DATABASE_URL:", db_url)
sessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)