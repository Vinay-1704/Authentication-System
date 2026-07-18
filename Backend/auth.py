from passlib.context import CryptContext

#jwt library
from jose import jwt,JWTError
from datetime import datetime,timedelta

# password hashing
pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

def hash_password(password:str):
    return pwd_context.hash(password)

def verify_password(
        plain_password,
        hashed_password
):
    return pwd_context.verify(
        plain_password,hashed_password
    )

# Jwt setup
SECRET_KEY="vinay_virat_super_secret-key"
ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES=30

#CREATE JWT TOKEN
def create_access_token(data:dict):

    to_encode=data.copy()
    expire=(
        datetime.utcnow()
        +timedelta(
            minutes=ACCESS_TOKEN_EXPIRE_MINUTES
        )
    )
    to_encode.update(
        {"exp":expire}
    )

    encoded_jwt= jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return encoded_jwt

#Verify JWT
def verify_token(token:str):

    try:

        payload=jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        return payload
    
    except JWTError:

        return None