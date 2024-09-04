from fastapi import APIRouter, Depends, HTTPException
from ...models import PostModel
from .posts_repository import PostsRepository
from .posts_domain import PostsDomain
from ..user_module import user_domain
from ..auth_module import auth_middleware
from datetime import datetime

# posts_router = APIRouter()
posts_router = APIRouter(dependencies=[Depends(auth_middleware)])
post_respository = PostsRepository()
post_domain = PostsDomain(post_respository)

@posts_router.post("/post", status_code=201)
async def create_post(post:PostModel):
    post.created_at = datetime.now()
    return (await post_domain.create_post(post)).to_response_dict()

@posts_router.get("/posts/{page}", response_model=list)
async def get_posts(page:int):
    result = await post_domain.get_all_posts(page)
    return result

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

@posts_router.post("/post/like/{post_id}", status_code=201)
async def like_post(post_id:str, token = Depends(auth_middleware)):
    result = await post_domain.like_post(post_id, token["id"])
    if result is None:
        raise HTTPException(status_code=404, detail="Post nao encontrado")
    
@posts_router.post("/post/save/{post_id}", status_code=201)
async def save_post(post_id:str, token = Depends(auth_middleware)):
    result = await post_domain.save_post(post_id, token["id"])
    if result is None:
        raise HTTPException(status_code=404, detail="Post nao encontrado")

@posts_router.get("/user_posts", status_code=200)
async def get_user_posts(token = Depends(auth_middleware)):
    result = await post_domain.get_posts_by_user_id(token["id"])
    return result

@posts_router.get("/posts/user/saved/{user_id}", status_code=200)
async def get_post_saved_by_user(token = Depends(auth_middleware)):
    result = await post_domain.get_saved_posts_by_user_id(token["id"])
    return [post.to_response_dict() for post in result]

@posts_router.get("/posts/user/liked", status_code=200)
async def get_user_post(token = Depends(auth_middleware)):
    result = await post_domain.get_liked_posts_by_user_id(token["id"])
    return [post.to_response_dict() for post in result]

