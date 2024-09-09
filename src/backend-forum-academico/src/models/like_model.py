from .base_model import CustomBaseModel

class LikeModel(CustomBaseModel):
    user_id:str | None
    post_id:str | None