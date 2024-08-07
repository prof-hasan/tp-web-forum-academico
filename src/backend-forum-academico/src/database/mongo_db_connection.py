from motor.motor_asyncio import AsyncIOMotorClient
from .database_constants import DatabaseConstants

class MongoDBConnection:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super(MongoDBConnection, cls).__new__(cls, *args, **kwargs)
            cls._instance._client = AsyncIOMotorClient('mongodb://localhost:27017/')
            cls._instance._db = cls._instance._client[DatabaseConstants.DATABASE] 

        print("\nConectado ao MongoDB!\n")
        return cls._instance

    # @property
    # def client(self):
    #     return self._client

    @property
    def db(self):
        return self._db
    
    def close(self):
        self._client.close()

    async def seedDatabse(self):
        await self._db[DatabaseConstants.USER_COLLECTION].insert_one({
            "name": "leonardo",
            "role": "admin",
            "email": "leonardo@email.com",
            "password": "12345"
        })


databseConnection = MongoDBConnection()