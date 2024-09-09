# Boas Práticas de Programação

- **Seguir a organização base do frontend que será:**
    - A pasta `pages` armazena a implementação de cada uma das páginas do sistema, sendo cada página um conjunto de componentes.
    - Cada componente do sistema deve ficar dentro da pasta `componentes`, para que possam ser reaproveitados em qualquer página que for necessário.
    - O acesso ao backend deve ser feito por meio de um contexto especifico (usando o context API).
    - Estilos devem ser organizados por módulos, separando CSS por componente ou página para facilitar a manutenção.
    - Utilize TypeScript para garantir que os tipos de dados passados para os componentes estejam corretos.
    - Evitar estados globais sempre que possível, utilizando `useContext` para dados entre componentes.

- **Seguir a organização do backend que será:**
    - Utilizar as 3 camadas de acesso:
        1. **Controller**: Responsável por receber as requisições e validar os dados da request.
        2. **Domain**: Responsável por gerenciar as regras de negócio e manipulação dos dados.
        3. **Repository**: Responsável unicamente pelo acesso ao banco de dados. Todo acesso ao banco de dados deve ser feito por essa camada.
    - Com exceção da rota de criação de usuário, todas as rotas devem utilizar o middleware de autenticação, que será responsável por validar o token enviado pelo usuário.
    - Seguir os princípios de **SOLID** para manter o código modular, flexível e de fácil manutenção.
    - Para evitar duplicação de lógica, centralizar validações e tratamentos de erro em middlewares sempre que possível.
    - Garantir que o código seja escalável, usando paginamento e cache em rotas que retornam grandes volumes de dados.

- **Boas práticas gerais:**
    - Antes de enviar uma alteração para o projeto, garanta que ela está testada e funciona.
    - Adotar boas práticas de controle de versão, utilizando branches organizadas, com nomes claros e commits bem descritos.
    - Manter a consistência de formatação do código seguindo as regras de linting definidas no projeto.
    - **Clean Code**: Seguir as diretrizes de Clean Code, priorizando legibilidade, uso de nomes descritivos, e evitando funções muito longas.
    - Realizar revisões de código (nos pull requests) para garantir que o código seja de alta qualidade e esteja em conformidade com os padrões do projeto.
