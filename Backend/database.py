from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

db_url="postgresql://postgres:Vinay%401704@localhost:5432/auth_demo"

engine= create_engine(db_url)

sessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)