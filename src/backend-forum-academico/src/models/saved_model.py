from .base_model import CustomBaseModel

class SavedModel(CustomBaseModel):
    user_id:str | None
    post_id:str | None
    