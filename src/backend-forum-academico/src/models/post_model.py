from .base_model import CustomBaseModel
from .like_model import LikeModel
from .saved_model import SavedModel

class PostModel(CustomBaseModel):
    user_id:str | None
    text:str | None
    title:str | None
    likes:list[LikeModel] | None
    saveds:list[SavedModel] | None
