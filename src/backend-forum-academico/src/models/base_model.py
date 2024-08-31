from typing import Optional
from bson import ObjectId
from pydantic import BaseModel
from datetime import datetime

class CustomBaseModel(BaseModel):
    id: str|None = None
    created_at:datetime | None
    deleted_at:datetime | None
    deleted_by:str | None

    def __post_init__(self):
        if self.id is None:
            self.id = None
        elif isinstance(self.id, str):
            self.id = ObjectId(self.id)
        elif isinstance(self.id, ObjectId):
            self.id = self.id
        else:
            raise ValueError("id must be a string or ObjectId")
        
    def to_response_dict(self):
        data = vars(self)
        if 'id' in data and isinstance(data['id'], ObjectId):
            data['id'] = str(data['id'])
        return data
    
    def to_mongo_dict(self):
        data = vars(self)
        if self.id is None:
            data["_id"] = ObjectId()
        elif isinstance(data['id'], str):
            data['_id'] = ObjectId(data['id'])
        elif isinstance(data['id'], ObjectId):
            data['_id'] = data['id']

        del data['id']

        return data

    @classmethod
    def from_mongo(cls, data):
        id = str(data['_id'])
        del data['_id']
        data["id"] = id
        return cls(**data)

