from bson import ObjectId
from .posts_repository import PostsRepository
from ...models import PostModel

class PostsDomain:
    def __init__(self, posts_repository:PostsRepository):
        self.__posts_repository = posts_repository

    async def create_post(self, post:PostModel):
        return await self.__posts_repository.save(post)
    
    async def get_all_posts(self, page:int):
        posts_dict = await self.__posts_repository.find_elements_paginated({}, page)
        return [PostModel.from_mongo(post) for post in posts_dict]
    
    async def get_post_by_id(self, post_id:str):
        post_dict = await self.__posts_repository.find_one({"_id": ObjectId(post_id)})
        if post_dict is None:
            return None
        return PostModel.from_mongo(post_dict)
    


# Update post by id
# Delete post by id
# Like post
# Save Post
# Get post by userId
# Get saved posts by userId
# Get liked posts by userId