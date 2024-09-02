from ...repository import BaseRepository
from ...database import DatabaseConstants
from ...models import PostModel
from typing import TypeVar

T = TypeVar('T', bound=PostModel)

class PostsRepository(BaseRepository[T]):
    def __init__(self):
        super().__init__(DatabaseConstants.POST_COLLECTION, PostModel)