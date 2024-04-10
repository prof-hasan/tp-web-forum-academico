# Para instar o projeto

- Navegar para a pasta raiz do projeto (onde esse readme está)
- Instalar o pipenv com:
    ```bash
    pip install pipenv
    ```
- Iniciar o ambiente com: 
    ```bash
    pipenv shell
    ```
    Ao iniciar o ambiente normalmente aparece o nome do ambiente (backend-forum-academico) no proprio terminal, indicando que o ambiente foi iniciado.
- Instalar as dependencias com:
     ```bash
    pipenv install
    ```
- Rodar o projeto com: 
    ```bash
    uvicorn src.main:app --reload
    ```
    A flag reload é para a aplicação reiniciar quando um arquivo for modificado, sem a necessiade de parar a execução e rodar o comando novamente