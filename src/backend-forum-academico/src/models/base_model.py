from bson import ObjectId
from pydantic import BaseModel
from datetime import datetime

class CustomBaseModel(BaseModel):
    id: str|None = None
    created_at: datetime = datetime.now() 
    deleted_at:datetime | None = None
    deleted_by:str | None = None

    def __post_init__(self):
        if self.id is None:
            self.id = None
        elif isinstance(self.id, str):
            self.id = ObjectId(self.id)
        elif isinstance(self.id, ObjectId):
            self.id = self.id
        else:
            raise ValueError("O ID precisa ser uma string ou um ObjectId")
        
    def to_response_dict(self):
        data = vars(self)

        for key, value in data.items():
            if isinstance(value, CustomBaseModel):
                data[key] = value.to_response_dict()
            elif isinstance(value, list):
                data[key] = [
                    item.to_response_dict() if isinstance(item, CustomBaseModel) else item 
                    for item in value
                ]

        if 'id' in data and isinstance(data['id'], ObjectId):
            data['id'] = str(data['id'])
        
        if "_id"in data and data["_id"]!= None:
            del data['_id']
        return data
    
    def to_mongo_dict(self):
        data = vars(self)

        for key, value in data.items():
            if isinstance(value, CustomBaseModel):
                data[key] = value.to_mongo_dict()
            elif isinstance(value, list):
                data[key] = [
                    item.to_mongo_dict() if isinstance(item, CustomBaseModel) else item 
                    for item in value
                ]

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

