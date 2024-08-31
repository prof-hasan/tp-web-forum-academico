from bson import ObjectId
from ..database import databseConnection
from ..models import CustomBaseModel
from datetime import datetime

class BaseRepository:
    def __init__(self, collection_name: str):
        self.db = databseConnection.db
        self.collection_name = collection_name

    def __get_collection(self):
        return self.db[self.collection_name]

    async def find(self, filter: dict = {}):
        filter["deleted_at"] = None
        return await self.__get_collection().find(filter).to_list(None)
    
    async def find_elements_paginated(self, filter: dict = {}, page:int = 1):
        filter["deleted_at"] = None
        page_size = 2
        skip = (page - 1) * page_size
        return await self.__get_collection().find(filter).sort("created_at", -1).skip(skip).limit(page_size).to_list(None)
    
    async def find_one(self, filter: dict = {}):
        filter["deleted_at"] = None
        return await self.__get_collection().find_one(filter)
    
    async def save(self, document: CustomBaseModel):
        collection = self.__get_collection()
        if  document.id is not None:
            id = document.id
            mongo_dict = document.to_mongo_dict()
            del mongo_dict["_id"]
            await collection.replace_one({"_id": ObjectId(id)}, mongo_dict)
        else:
            document.id = (await collection.insert_one(document.to_mongo_dict())).inserted_id
        return document
    
    async def soft_delete(self, document: CustomBaseModel):
        document.deleted_at = datetime.now()
        await self.save(document)

    async def delete_all(self):
        await self.__get_collection().delete_many({})
