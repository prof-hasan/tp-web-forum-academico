import sys
import os

project_root = os.path.dirname(__file__)
backend_path = os.path.join(project_root, 'src', 'backend-forum-academico')
sys.path.append(backend_path)

from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from .src.database import Seed
from .src import user_router, auth_router
from .src.modules.auth_module import TokenDomain

@asynccontextmanager
async def lifespan(app: FastAPI):
    await Seed(TokenDomain()).seedDatabse()
    yield
    print("\nFechando a aplicacao...\n")

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir todas as origens
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos os métodos
    allow_headers=["*"],  # Permitir todos os cabeçalhos
)

@app.get("/")
async def root():
    return {"message": "Hello World"}

app.include_router(user_router)
app.include_router(auth_router)

print("Projeto iniciado em http://localhost:8000")