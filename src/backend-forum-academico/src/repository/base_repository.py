from ..database import databseConnection
from ..models import CustomBaseModel


class BaseRepository:
    def __init__(self, collection_name: str):
        self.db = databseConnection.db
        self.collection_name = collection_name

    def __get_collection(self):
        return self.db[self.collection_name]

    async def find(self, filter: dict = {}):
        return await self.__get_collection().find(filter).to_list(None)
    
    async def find_elements_paginated(self, filter: dict = {}, page:int = 1):
        page_size = 2
        skip = (page - 1) * page_size
        return await self.__get_collection().find(filter).sort("created_at", -1).skip(skip).limit(page_size).to_list(None)
    
    async def find_one(self, filter: dict = {}):
        return await self.__get_collection().find_one(filter)
    
    async def save(self, document: CustomBaseModel):
        collection = self.__get_collection()
        if '_id' in document and document['_id']:
            await collection.replace_one({"_id": document['_id']}, document)
        else:
            document.id = (await collection.insert_one(document.to_mongo_dict())).inserted_id
        return document
    
    async def delete(self, document: CustomBaseModel):
        await self.__get_collection().delete_one({"id": document.id})

    async def delete_all(self):
        await self.__get_collection().delete_many({})
