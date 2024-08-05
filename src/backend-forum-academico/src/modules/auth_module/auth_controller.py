from datetime import timedelta
from fastapi import APIRouter
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi import Depends, HTTPException
from typing import Annotated, Union
from ..user_module import UserDomain
from ...models import UserModel, Token, TokenData
from .auth_domain import ACCESS_TOKEN_EXPIRE_MINUTES, AuthDomain
import jwt
from passlib.context import CryptContext
from jwt.exceptions import InvalidTokenError
from typing import Annotated, Union


auth_router = APIRouter()

authDomain = AuthDomain(UserDomain)


@auth_router.post("/login")
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
) -> Token:
    user = await authDomain.authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    token = await authDomain.create_access_token(user)
    return {"access_token": token, "token_type": "bearer"}