import sys
import os

project_root = os.path.dirname(__file__)
backend_path = os.path.join(project_root, 'src', 'backend-forum-academico')
sys.path.append(backend_path)

from fastapi import FastAPI
from contextlib import asynccontextmanager
from .src.database import Seed
from .src import user_router, auth_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    await Seed().seedDatabse()
    yield
    print("\nFechando a aplicacao...\n")

app = FastAPI(lifespan=lifespan)

@app.get("/")
async def root():
    return {"message": "Hello World"}

app.include_router(user_router)
app.include_router(auth_router)

print("Projeto iniciado em http://localhost:8000")