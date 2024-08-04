from .base_model import CustomBaseModel
class UserModel(CustomBaseModel):
    name:str | None
    email:str | None
    password:str | None
    role:str | None

    def __init__(self, id=None, name=None, email=None, role=None, password=None):
        super().__init__(id)
        self.name = name
        self.email = email
        self.password = password
        self.role = role