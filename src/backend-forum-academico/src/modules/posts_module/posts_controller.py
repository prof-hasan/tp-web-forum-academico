from fastapi import APIRouter
from ...models import PostModel

posts_router = APIRouter()

@posts_router.post("/post")
async def create_post(post:PostModel):
    print(post)
    return {"post": post.to_response_dict()}