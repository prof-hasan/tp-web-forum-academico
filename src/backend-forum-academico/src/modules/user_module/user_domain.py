from bson import ObjectId
from .user_repository import UserRepository
from ...models import UserModel

class UserDomain:
    def __init__(self, user_repository: UserRepository[UserModel]):
        self.__user_repository = user_repository

    async def get_all_users(self):
        users = await self.__user_repository.find({})
        if users is None:
            return None
        return users
    
    async def get_user_by_id(self, user_id: str):
        user = await self.__user_repository.find_one({"_id": ObjectId(user_id)})
        if user is None:
            return None
        return user
    
    async def get_user_by_email(self, email: str):
        user = await self.__user_repository.find_one({"email": email})
        if user is None:
            return None
        return user
    
    async def delet_all(self):
        await self.__user_repository.delete_all()

    async def create_user(self, user: UserModel):
        await self.__user_repository.save(user)

    async def update_user(self, user: UserModel, user_id: str, passwordUpdate: bool)->bool:
        if not passwordUpdate:
            old_user_data = await self.get_user_by_id(user_id)
            if old_user_data is None:
                return False
            user.password = old_user_data.password
        await self.__user_repository.save(user)
        return True