from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from ...models import TokenData
import jwt
from jwt.exceptions import InvalidTokenError
from typing import Annotated
from ..user_module.user_domain import UserDomain
from .token_domain import TokenDomain
from .token_domain import oauth2_scheme

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class AuthDomain:
    def __init__(self, userDomain:UserDomain, token_domain:TokenDomain):
        self.__userDomain = userDomain
        self.__token_domain = token_domain

    async def get_current_user(self, token: Annotated[str, Depends(oauth2_scheme)]):
        credentials_exception = HTTPException(
            status_code=401,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
        try:
            payload = jwt.decode(token, self.__token_domain.SECRET_KEY, algorithms=[self.__token_domain.ALGORITHM])
            email: str = payload.get("sub")
            if email is None:
                raise credentials_exception
            token_data = TokenData(email=email)
        except InvalidTokenError:
            raise credentials_exception
        
        # TODO - Use userRepository to get id 
        user = await self.__userDomain.get_user_by_id()
        if user is None:
            raise credentials_exception
        return user


    async def authenticate_user(self, email: str, password: str):
        user = await self.__userDomain.get_user_by_email(email)
        if not user:
            return None
        if not self.__token_domain.verify_password(password, user.password):
            return False
        return user
    


