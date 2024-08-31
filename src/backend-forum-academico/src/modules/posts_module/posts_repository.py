from ...repository import BaseRepository
from ...database import DatabaseConstants

class PostsRepository(BaseRepository):
    def __init__(self):
        super().__init__(DatabaseConstants.POST_COLLECTION)