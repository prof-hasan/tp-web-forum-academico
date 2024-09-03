from .base_model import CustomBaseModel
class UserModel(CustomBaseModel):
    name:str | None
    email:str | None
    password:str | None
    role:str | None =  "user"

    def to_toke_data(self):
        return {
            "name": self.name,
            "email": self.email,
            "role": self.role
        }