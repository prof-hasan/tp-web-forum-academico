from fastapi import APIRouter
from .user_repository import UserRepository
from .user_domain import UserDomain
from ...models import UserModel

userRepository = UserRepository()
user_domain = UserDomain(userRepository)

user_router = APIRouter()

@user_router.get("/users", response_model=list[UserModel])
async def get_users():
    users = await user_domain.get_all_users()
    return [user.to_response_dict() for user in users]