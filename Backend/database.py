import os

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


# db_url="postgresql://postgres:Vinay%401704@localhost:5432/auth_demo"
db_url=os.getenv("postgresql://neondb_owner:npg_P64alXrRmIBk@ep-gentle-darkness-awrr1byn.c-12.us-east-1.aws.neon.tech/neondb?sslmode=require")

engine= create_engine(db_url)

sessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)