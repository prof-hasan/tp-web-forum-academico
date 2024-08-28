# Boas práticas de programação

- Seguir a organização base do frontend que será:
    - A pasta pages armazena implementação de cada uma das páginas do sistema, sendo cada página um conjunto de componentes.
    - Cada componente do sistema deve ficar dentro da pasta componentes, para que possam ser reaproveitados em qualquer página que for necessário.
    - Devem existir componentes base com a configuração de tipografia pronta, como titulos, paragrágrafos e botões.
    - O acesso ao backend deve ser feito por meio de uma classe externa aos componentes.
- Seguir a organização do backend que será
    - Utilizar as 3 camadas de acesso: 
        1. Controller: Responsável por receber as requisições e validar os dados da request.
        2. Domain: Responsável por gerenciar as regras de negócio e manipulação dos dados.
        3. Repository: Responsável unicamente pelo acesso ao banco de dados. Todo acesso ao banco de dados deve ser feito por essa camada.
    - Com exeção da rota de criação de usuário, todas as rotas devem utilizar o middleware de autenticação que será responsável por validar o token enviado pelo usuário.
    - Os códigos em comum a mais de uma rota devem ficar na pasta shared, como constantes, helpers e models.
- Antes de enviar uma alterção para o projeto, garanta que ela está testada e funciona.
