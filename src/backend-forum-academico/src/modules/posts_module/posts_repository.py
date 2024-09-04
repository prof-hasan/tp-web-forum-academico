from ...repository import BaseRepository
from ...database import DatabaseConstants
from ...models import PostModel
from typing import TypeVar

T = TypeVar('T', bound=PostModel)

class PostsRepository(BaseRepository[T]):
    def __init__(self):
        super().__init__(DatabaseConstants.POST_COLLECTION, PostModel)

    async def get_posts_with_users(self, filter: dict = {}, page: int = 1):
        filter["deleted_at"] = None
        page_size = 10
        skip = (page - 1) * page_size
        pipeline = [
            {
                "$match": filter  # Aplica o filtro incluindo "deleted_at": None
            },
            {
                "$lookup": {
                    "from": "users",
                    "let": {"user_id": {"$toObjectId": "$user_id"}},  # Converte user_id para ObjectId
                    "pipeline": [
                        {
                            "$match": {
                                "$expr": {
                                    "$eq": ["$_id", "$$user_id"]
                                }
                            }
                        }
                    ],
                    "as": "user_info"
                }
            },
            {
                "$unwind": "$user_info"
            },
            {
                "$project": {
                    "_id": {"$toString": "$_id"},  # Converte o ObjectId do post para string
                    "created_at": 1,
                    "text": 1,
                    "user_name": "$user_info.name",
                    "title":1,
                    "likes": 1,
                    "saveds": 1
                }
            },
            {
                "$sort": {"created_at": -1}
            },
            {
                "$skip": skip
            },
            {
                "$limit": page_size
            }
        ]

        posts = await self._BaseRepository__get_collection().aggregate(pipeline).to_list(length=None)
        return posts

















    