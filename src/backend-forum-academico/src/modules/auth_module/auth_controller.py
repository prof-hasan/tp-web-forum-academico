from fastapi import APIRouter
from fastapi.security import OAuth2PasswordRequestForm
from fastapi import Depends, HTTPException
from typing import Annotated
from ...models import Token


auth_router = APIRouter()

def get_auth_token_domain():
    from ..user_module import UserDomain, UserRepository
    from .auth_domain import  AuthDomain
    from .token_domain import TokenDomain
    
    user_repository = UserRepository()
    token_domain = TokenDomain()
    user_domain = UserDomain(user_repository)
    authDomain = AuthDomain(user_domain, token_domain)
    return authDomain,token_domain


@auth_router.post("/login")
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
) -> Token:
    auth_domain,token_domain = get_auth_token_domain()
    user = await auth_domain.authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    token = token_domain.create_access_token(user.to_toke_data())
    return {"access_token": token, "token_type": "bearer"}