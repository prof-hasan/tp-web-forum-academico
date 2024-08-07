from fastapi import APIRouter
from fastapi.security import OAuth2PasswordRequestForm
from fastapi import Depends, HTTPException
from typing import Annotated
from ..user_module import user_domain
from ...models import Token
from .auth_domain import  AuthDomain
from .token_domain import TokenDomain

auth_router = APIRouter()

tokenDomain = TokenDomain()
authDomain = AuthDomain(user_domain, tokenDomain)


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
    token = tokenDomain.create_access_token(user.to_toke_data())
    return {"access_token": token, "token_type": "bearer"}