from fastapi import APIRouter, HTTPException
from ...models import PostModel
from .posts_repository import PostsRepository
from .posts_domain import PostsDomain

posts_router = APIRouter()

post_respository = PostsRepository()
post_domain = PostsDomain(post_respository)

@posts_router.post("/post", status_code=201)
async def create_post(post:PostModel):
    return (await post_domain.create_post(post)).to_response_dict()
     

@posts_router.get("/posts/{page}", response_model=list[PostModel])
async def get_posts(page:int):
    posts = await post_domain.get_all_posts(page)
    return [post.to_response_dict() for post in posts]

@posts_router.get("/post/{post_id}", response_model=PostModel)
async def get_post_by_id(post_id:str):
    post = await post_domain.get_post_by_id(post_id)
    if post is None:
        raise HTTPException(status_code=404, detail="Post nao encontrado")
    return post.to_response_dict()

@posts_router.put("/post", response_model=PostModel)
async def get_post_by_id(post:PostModel):
    post = await post_domain.update_post(post)
    if post is None:
        raise HTTPException(status_code=404, detail="Post nao encontrado")
    return post.to_response_dict()

@posts_router.delete("/post/{post_id}", response_model=PostModel)
async def get_post_by_id(post_id:str):
    post = await post_domain.delete_post_by_id(post_id)
    if post is None:
        raise HTTPException(status_code=404, detail="Post nao encontrado")
    return post.to_response_dict()

@posts_router.post("/post/{post_id}/like/{user_id}", status_code=201)
async def like_post(post_id:str, user_id:str):
    result = await post_domain.like_post(post_id, user_id)
    if result is None:
        raise HTTPException(status_code=404, detail="Post nao encontrado")
    
@posts_router.post("/post/{post_id}/save/{user_id}", status_code=201)
async def save_post(post_id:str, user_id:str):
    result = await post_domain.save_post(post_id, user_id)
    if result is None:
        raise HTTPException(status_code=404, detail="Post nao encontrado")

@posts_router.get("/posts/user/{user_id}", status_code=200)
async def save_post(user_id:str):
    result = await post_domain.get_posts_by_user_id(user_id)
    return [post.to_response_dict() for post in result]

@posts_router.get("/posts/user/saved/{user_id}", status_code=200)
async def save_post(user_id:str):
    result = await post_domain.get_saved_posts_by_user_id(user_id)
    return [post.to_response_dict() for post in result]


# Get liked posts by userId

