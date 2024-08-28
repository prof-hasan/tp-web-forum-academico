from pydantic import BaseModel
from .base_model import CustomBaseModel
from datetime import datetime

class LikeModel(CustomBaseModel):
    user_id:str | None
    post_id:str | None
    created_at:datetime | None
    deleted_at:datetime | None