from fastapi import APIRouter
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


# Get post by id
# Update post by id
# Delete post by id
# Like post
# Save Post
# Get post by userId
# Get saved posts by userId
# Get liked posts by userId

