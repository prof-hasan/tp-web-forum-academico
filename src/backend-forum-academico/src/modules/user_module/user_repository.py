from ...repository import BaseRepository
from ...database import DatabaseConstants

class UserRepository(BaseRepository):
    def __init__(self):
        super().__init__(DatabaseConstants.USER_COLLECTION)
