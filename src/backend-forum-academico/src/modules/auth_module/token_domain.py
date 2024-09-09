from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
import jwt
from datetime import datetime, timedelta, timezone
from typing import  Union

# TODO - Change this secret key to a more secure one 
# TODO - Put it in a env file
# TEMPORARY SECRET KEY, ALGORITHM AND EXPIRE TIME 
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 180

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")


async def auth_middleware(token:str = Depends(oauth2_scheme)):
    try:
        token = decode_jwt_token(token)
        if token:
            return token
        else:
            raise HTTPException(status_code=401, detail="Token Invalido")
    except Exception as err:
        print(err)
        raise HTTPException(status_code=401)
    
def decode_jwt_token(token:str):
    try:
        token_payload = jwt.decode(token,key=SECRET_KEY, algorithms=ALGORITHM)
        
        return token_payload
    
    except jwt.ExpiredSignatureError:
        raise "Invalid Token"

    except Exception:
        raise "Authorization error!"

class TokenDomain:
    def create_access_token(self, data: dict, expires_delta: Union[timedelta, None] = None):
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.now(timezone.utc) + expires_delta
        else:
            expire = datetime.now(timezone.utc) + timedelta(minutes=15)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
        return encoded_jwt
    
    def verify_password(self, plain_password, hashed_password):
        return pwd_context.verify(plain_password, hashed_password)


    def get_password_hash(self, password):
        return pwd_context.hash(password)