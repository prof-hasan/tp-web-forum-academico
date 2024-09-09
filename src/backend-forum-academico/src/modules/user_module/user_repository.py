from ...repository import BaseRepository
from ...database import DatabaseConstants
from ...models import UserModel
from typing import TypeVar

T = TypeVar('T', bound=UserModel)

class UserRepository(BaseRepository[T]):
    def __init__(self):
        super().__init__(DatabaseConstants.USER_COLLECTION,UserModel)
