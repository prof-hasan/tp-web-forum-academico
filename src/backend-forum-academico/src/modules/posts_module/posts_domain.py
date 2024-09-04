from bson import ObjectId
from .posts_repository import PostsRepository
from ...models import PostModel, LikeModel, SavedModel
from datetime import datetime

class PostsDomain:
    def __init__(self, posts_repository:PostsRepository[PostModel]):
        self.__posts_repository = posts_repository

    async def create_post(self, post:PostModel):
        #TODO verificar se o usuario existe
        return await self.__posts_repository.save(post)
    
    async def get_all_posts(self, page:int):
        posts = await self.__posts_repository.get_posts_with_users({},page)
        return posts
    
    async def get_post_by_id(self, post_id:str):
        post = await self.__posts_repository.find_one({"_id": ObjectId(post_id)})
        if post is None:
            return None
        return post
    
    async def update_post(self, post:PostModel):
        return await self.__posts_repository.save(post)
    
    async def delete_post_by_id(self, post_id:str):
        #TODO preencher o deleted_by
        post = await self.get_post_by_id(post_id)
        if post is None:
            return None
        await self.__posts_repository.soft_delete(post)
        return post
    
    async def like_post(self, post_id:str, user_id:str):
        post = await self.get_post_by_id(post_id)
        if post is None:
            return None
        
        like = LikeModel(user_id=user_id, post_id=post_id)
        like.created_at = datetime.now()

        post.likes.append(like)
        return await self.__posts_repository.save(post)
    
    async def save_post(self, post_id:str, user_id:str):
        post = await self.get_post_by_id(post_id)
        if post is None:
            return None
        
        saved = SavedModel(user_id=user_id, post_id=post_id)
        saved.created_at = datetime.now()

        post.saveds.append(saved)
        return await self.__posts_repository.save(post)
    
    async def get_posts_by_user_id(self, user_id:str):
        posts =  await self.__posts_repository.find({"user_id": user_id})
        return posts
    
    async def get_saved_posts_by_user_id(self, user_id:str):
        posts =  await self.__posts_repository.find({"saveds.user_id": user_id})
        return posts
    
    async def get_liked_posts_by_user_id(self, user_id:str):
        posts =  await self.__posts_repository.find({"likes.user_id": user_id})
        return posts
    
