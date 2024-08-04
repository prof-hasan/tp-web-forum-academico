from bson import ObjectId

class CustomBaseModel:
    id: str | None

    def __init__(self, id):
        if id is None:
            self.id = None
        elif isinstance(id, str):
            self.id = ObjectId(id)
        elif isinstance(id, ObjectId):
            self.id = id
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
        return cls(id, **data)

