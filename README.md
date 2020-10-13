## PlaceHolder-API

https://youtu.be/Jmh0ofSEm_U

> Aplicação Nodejs em TypeScript que consume dados de uma webapi e armazena no banco de dados MySQL local.

### Escopo da API

> Está aplicação contém dois endpoints, para baixar e salvar dados.

`http://localhost:3001/api/baixar-dados`

`http://localhost:3001/api/salvar-dados`

- Salvar dados está implementado uma regra para salvar apenas os usuários em Suites e não em Apt.

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
npm run test
```

## Swagger

Acessar `http://localhost:3001/swagger/` documentação em Swagger-UI

### Arquivo de Logs

No diretório raiz do projeto será gerado um arquivo log da aplicação, assim que iniciar.

### Conexão com o banco de dados

- Dentro do arquivo .env configure dados de conexão com banco (Host,User,Password e DB)
- Caso rode em Dev o aquivo é o nodemon.json na pasta settings e configure dados de conexão com banco (Host,User,Password e DB)


```conectar mysql server
    mysql -h localhost -u root -p
```

```criar banco de dados
    CREATE DATABASE IF NOT EXISTS my_db; USE my_db;
```
