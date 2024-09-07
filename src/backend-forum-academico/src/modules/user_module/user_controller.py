from fastapi import APIRouter, Depends, HTTPException
from .user_repository import UserRepository
from .user_domain import UserDomain
from ...models import UserModel
from ..auth_module import TokenDomain
from ..auth_module import auth_middleware

user_repository = UserRepository()
token_domain = TokenDomain()
user_domain = UserDomain(user_repository)

user_router = APIRouter(dependencies=[Depends(auth_middleware)])

@user_router.get("/users", response_model=list[UserModel])
async def get_users():
    users = await user_domain.get_all_users()
    result = [user.to_response_dict() for user in users]
    return result


@user_router.delete("/users")
async def delete_all_users():
    await user_domain.delet_all()
    return {"message": "All users deleted successfully!"}

@user_router.post("/user", status_code=201)
async def create_user(user: UserModel):
    user.password = token_domain.get_password_hash(user.password)
    user = await user_domain.create_user(user)
    return

@user_router.get("/my_user", response_model=UserModel)
async def get_user_by_id(token = Depends(auth_middleware)):
    user = await user_domain.get_user_by_id(token["id"])
    return user

@user_router.put("/my_user/{passwordUpdate}", status_code=201)
async def update_user(user: UserModel, passwordUpdate:bool, token = Depends(auth_middleware)):
    if passwordUpdate:
        user.password = token_domain.get_password_hash(user.password)
    result = await user_domain.update_user(user, token["id"], passwordUpdate)
    if result:
        return True
    raise HTTPException(status_code=404, detail="User not found")
    