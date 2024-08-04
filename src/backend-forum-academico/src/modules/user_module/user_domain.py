from .user_repository import UserRepository
from ...models import UserModel

class UserDomain:
    def __init__(self, user_repository: UserRepository):
        self.user_repository = user_repository

    async def get_all_users(self):
        users = await self.user_repository.find({})
        return [UserModel.from_mongo(user) for user in users]