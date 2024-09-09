from .mongo_db_connection import databseConnection
from .database_constants import DatabaseConstants
from ..modules.auth_module import TokenDomain
from datetime import datetime

class Seed:
    def __init__(self, authDomain:TokenDomain):
        self.db = databseConnection.db
        self.__authDomain = authDomain

    async def seedDatabse(self):
        count_users = await self.db[DatabaseConstants.USER_COLLECTION].count_documents({})
        if(count_users == 0):
            await self.insertUsers()
    

    async def insertUsers(self):
        hashed_password = self.__authDomain.get_password_hash("12345")
        users = [
            {
                "name": "Leonardo Leite",
                "role": "admin",
                "email": "leonardo@email.com",
                "password": hashed_password,
                "created_at": datetime.now()
            },
            {
                "name": "Luiz Vitor",
                "role": "admin",
                "email": "luiz_vitor@email.com",
                "password": hashed_password,
                "created_at": datetime.now()
            },
            {
                "name": "Glaston",
                "role": "admin",
                "email": "glaston@email.com",
                "password": hashed_password,
                "created_at": datetime.now()
            }
        ]

        await self.db[DatabaseConstants.USER_COLLECTION].insert_many(users)