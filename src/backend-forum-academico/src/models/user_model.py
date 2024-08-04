from .base_model import MongoModel

class UserModel(MongoModel):
    name: str
    role: str
    email: str
    password: str