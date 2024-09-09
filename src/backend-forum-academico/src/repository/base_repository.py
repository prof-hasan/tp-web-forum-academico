from bson import ObjectId
from ..database import databseConnection
from ..models import CustomBaseModel
from datetime import datetime
from typing import Generic, TypeVar, List

T = TypeVar('T', bound=CustomBaseModel)

class BaseRepository(Generic[T]):
    def __init__(self, collection_name: str, model_type: type[T]):
        self.db = databseConnection.db
        self.collection_name = collection_name
        self.model_type = model_type

    def __get_collection(self):
        return self.db[self.collection_name]

    async def find(self, filter: dict = {})->List[T]:
        filter["deleted_at"] = None
        results = await self.__get_collection().find(filter).to_list(None)
        return [self.model_type(**result).from_mongo(result) for result in results]
    
    async def find_elements_paginated(self, filter: dict = {}, page:int = 1) -> List[T]:
        filter["deleted_at"] = None
        page_size = 10
        skip = (page - 1) * page_size
        result = await self.__get_collection().find(filter).sort("created_at", -1).skip(skip).limit(page_size).to_list(None)
        return [self.model_type(**item).from_mongo(item) for item in result]
    
    async def find_one(self, filter: dict = {})-> T | None:
        filter["deleted_at"] = None
        result = await self.__get_collection().find_one(filter)
        if result is None:
            return None
        return self.model_type(**result).from_mongo(result)
    
    async def save(self, document: T) -> T:
        collection = self.__get_collection()
        if  document.id is not None:
            id = document.id
            mongo_dict = document.to_mongo_dict()
            del mongo_dict["_id"]
            await collection.replace_one({"_id": ObjectId(id)}, mongo_dict)
        else:
            document.id = (await collection.insert_one(document.to_mongo_dict())).inserted_id
        return document
    
    async def soft_delete(self, document: T)->T:
        document.deleted_at = datetime.now()
        return await self.save(document)

    async def delete_all(self):
        await self.__get_collection().delete_many({})
