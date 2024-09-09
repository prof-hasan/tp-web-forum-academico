from main import app
from fastapi.testclient import TestClient

client = TestClient(app)


# Abaixo tem um teste simple, porém não conseguimos fazer funcionar devido a um 
# erro de importação, em que o pytest não encotra os modulos do projeto
def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello World"}