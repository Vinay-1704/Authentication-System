from fastapi import (FastAPI, Depends,HTTPException,Header)
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session

from database import sessionLocal, engine
from models import Base, User
from schemas import UserCreate, UserLogin

from auth import(
    hash_password,verify_password,create_access_token,verify_token
)

from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm



app= FastAPI()

#CORS

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://authentication-system-pi-neon.vercel.app",
        "https://authentication-system-l46q7t84d-vinays-projects-317cf85e.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

# OAuth2PasswordBearer instance to handle token extraction from requests, it mainly for swagger UI to get token automatically from the login endpoint and use it in protected routes. It is used as a dependency in the get_current_user function to extract the token from the request headers.
oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="login"
)

# Dependency to get the database session
def get_db():
    db= sessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_current_user(

    token: str = Depends(oauth2_scheme)

):

    payload = verify_token(token)

    return payload


@app.post("/register")
def register(user:UserCreate, db:Session = Depends(get_db)):

    existing_user=db.query(User).filter(
        User.email==user.email
    ).first()

    if existing_user:
        
        raise HTTPException(
            status_code=400,
            detail="User already exists"
        )

    new_user=User(
        username=user.username,
        email=user.email,
        password=hash_password(
            user.password
        )
    )

    db.add(new_user)
    db.commit()

    return{"Message":"User created account Successfully"}


@app.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db:Session = Depends(get_db)):

    user_exist=db.query(User).filter(
        User.email==form_data.username
    ).first()

    if not user_exist:

        raise HTTPException(
            status_code=404,
            detail="User not found"
        )
    
    if not verify_password(
        form_data.password,
        user_exist.password
    ):
        raise HTTPException(
            status_code=400,
            detail="Incorrect password"
        )
    
    token = create_access_token(
        {
            "sub":user_exist.email
        }
    )
    return {
        "access_token":token,
        "token_type":"bearer"
    }

# Protected Route
@app.get("/profile")
def profile(

    current_user=Depends(get_current_user)

):

    return {

        "email": current_user["sub"]

    }


@app.get("/dashboard")
def dashboard(

    current_user=Depends(get_current_user)

):

    return {

        "message": "Welcome",

        "user": current_user["sub"]

    }