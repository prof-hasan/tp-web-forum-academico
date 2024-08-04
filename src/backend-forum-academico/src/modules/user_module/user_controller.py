from fastapi import APIRouter
from .user_repository import UserRepository
from .user_domain import UserDomain
from ...models import UserModel

userRepository = UserRepository()
userDomain = UserDomain(userRepository)

user_router = APIRouter()

@user_router.get("/users")
async def get_users():
    users = await userDomain.get_all_users()
    print("chegou no controller")
    return [user.to_response_dict() for user in users]