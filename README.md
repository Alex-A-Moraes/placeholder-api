## PlaceHolder-API

> Aplicação Nodejs em TypeScript que consume dados de uma webapi e armazena no banco de dados MySQL local.

### Escopo da API

> Está aplicação contém dois endpoints, para baixar e salvar dados.

`http://localhost:3001/api/baixar-dados`
`http://localhost:3001/api/salvar-dados`

  * Salvar dados está implementado uma regra para salvar apenas os usuários em Suites e não em Apt.

### Configuração

```bash
npm install
```

### Desenvolvimento com nodemon

```bash
npm run dev
```
Acessar `http://localhost:3001/api/baixar-dados`

### Executar sem nodemon

```bash
npm start
```

Acessar `http://localhost:3001/api/baixar-dados`


### Executar testes automatizados

```bash
npm start
```

## Swagger

Acessar `http://localhost:3001/swagger/` documentação em Swagger-UI



