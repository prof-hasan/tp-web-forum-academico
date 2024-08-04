from .mongo_db_connection import databseConnection
from .database_constants import DatabaseConstants

class Seed:
    def __init__(self):
        self.db = databseConnection.db

    async def seedDatabse(self):
        count_users = await self.db[DatabaseConstants.USER_COLLECTION].count_documents({})
        if(count_users == 0):
            await self.insertUsers()
    

    async def insertUsers(self):
        users = [
            {
                "name": "Leonardo Leite",
                "role": "admin",
                "email": "leonardo@email.com",
                "password": "12345"
            },
            {
                "name": "Luiz Vitor",
                "role": "admin",
                "email": "luiz_vitor@email.com",
                "password": "12345"
            },
            {
                "name": "Glaston",
                "role": "admin",
                "email": "glaston@email.com",
                "password": "12345"
            }
        ]
        await self.db[DatabaseConstants.USER_COLLECTION].insert_many(users)