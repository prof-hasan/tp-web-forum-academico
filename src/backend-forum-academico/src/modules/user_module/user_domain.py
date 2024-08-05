from .user_repository import UserRepository
from ...models import UserModel

class UserDomain:
    def __init__(self, user_repository: UserRepository):
        self.__user_repository = user_repository

    async def get_all_users(self):
        users = await self.__user_repository.find({})
        return [UserModel.from_mongo(user) for user in users]
    
    async def get_user_by_id(self, user_id: str):
        user = await self.__user_repository.find_one({"_id": user_id})
        return UserModel.from_mongo(user)
    
    async def get_user_by_email(self, email: str):
        user = await self.__user_repository.find_one({"email": email})
        return UserModel.from_mongo(user)