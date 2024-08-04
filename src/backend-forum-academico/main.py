import sys
import os

project_root = os.path.dirname(__file__)
backend_path = os.path.join(project_root, 'src', 'backend-forum-academico')
sys.path.append(backend_path)

from fastapi import FastAPI
from contextlib import asynccontextmanager
from .src.database import DatabaseConstants, Seed, databseConnection

@asynccontextmanager
async def lifespan(app: FastAPI):
    await Seed().seedDatabse()
    yield
    print("\nFechando a aplicacao...\n")

app = FastAPI(lifespan=lifespan)

@app.get("/")
async def root():
    users = await databseConnection.db[DatabaseConstants.USER_COLLECTION].find().to_list(length=None)
    for user in users:
        del user["_id"]

    return {"message": "Hello World", "users":users}

print("Projeto iniciado em http://localhost:8000")