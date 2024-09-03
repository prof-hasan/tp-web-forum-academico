from fastapi import APIRouter
from .user_repository import UserRepository
from .user_domain import UserDomain
from ...models import UserModel
from ..auth_module import TokenDomain

user_repository = UserRepository()
token_domain = TokenDomain()
user_domain = UserDomain(user_repository)

user_router = APIRouter()

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