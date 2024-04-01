## Boas Práticas de segurança

- ⁠Exigir validação de injeção na entrada dos dados no backend.
- ⁠Encriptar as senhas dos usuários para não salvar em plain text no banco de dados.
- ⁠Tratar possíveis exceções antes de retornar em um end point ou exibir na tela.
- Utilizar autenticação JWT em todos os endpoints, exceto o de cadastro.
- ⁠Implementar HTTPS no sistema em produção.
- Manter registrado os dados e interações com o soft-delete.
- No frontend, caso o usuário não tenha um token valido, ele deve ser redirecionado para a página de login.