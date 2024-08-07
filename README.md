# cefet-web-tp

## Descrição do projeto
Este projeto visa o desenvolvimento de um fórum acadêmico, destinado a promover e facilitar o compartilhamento de conhecimento entre os alunos de uma mesma instituição de ensino superior. O objetivo principal é oferecer uma plataforma colaborativa onde os estudantes possam se apoiar mutuamente em seus estudos, esclarecendo dúvidas, compartilhando materiais e experiências, além de fomentar a interação entre discentes de diferentes cursos. Tal ferramenta se mostra importante não apenas para a melhoria do aprendizado individual e coletivo, mas também como um meio de fortalecer a comunidade acadêmica, incentivando a troca de saberes e o desenvolvimento de uma rede de apoio entre os alunos.

Na sua primeira versão, o fórum disponibilizará funcionalidades essenciais para alcançar esses objetivos, incluindo: a publicação de novos conteúdos, a visualização de publicações existentes, a avaliação de conteúdos por meio de 'likes' ou classificações similares, e a busca por publicações específicas. Estas funcionalidades foram escolhidas para assegurar que os usuários possam não apenas consumir conteúdo, mas também contribuir ativamente para a comunidade acadêmica, criando um ambiente rico em informações e suporte mútuo. O sucesso deste projeto poderá abrir portas para futuras implementações e melhorias, visando ampliar ainda mais o seu impacto positivo na experiência educacional dos estudantes.

## Tecnologias
Esse projeto é desenvolvido utilizando o framework JavaScript NextJs, com a biblioteca React para o frontend. No backend é o utilizado o framework Python FastAPI, e para o banco de dados é utlizado o MongoDB.  



# Funcionamento

## Como iniciar o banco de dados MongoDB

1. Certifique-se de que o Docker está instalado na sua máquina. Você pode baixar e instalar o Docker [aqui](https://docs.docker.com/get-docker/).
2. No terminal, navegue até o diretório raiz do projeto.
3. Execute o comando `docker-compose up -d` para iniciar o banco de dados MongoDB.

O banco de dados estará acessível em `mongodb://localhost:27017`.


## Rodar o backend 
Siga o readme para instalar as dependencias. Depois para executar do diretorio desse readme, basta executar:
```
pipenv run uvicorn src.backend-forum-academico.main:app --reload
```