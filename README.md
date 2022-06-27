
## Descrição

Uma simples aplicação de CRUD com NestJS e autenticação JWT.

Documentação da [API Swagger](https://github.com/LuanEleuterio/crud-jwt-nestjs/blob/8e2d67fda04e0f95e10c581435656d619f071037/swagger.yml)

## Get Started

### Step 1 - Enviroment variebles
Preencher as variáveis de ambiente abaixo:
```bash
#JWT
SECRET_WORD=

#DB
POSTGRES_SERVER_NAME=
POSTGRES_HOST=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
POSTGRES_PORT=
POSTGRES_SYNC=
```
### Step 2 - Data base Postgres
Para a configuração do Postgres, é necessário possuir em seu Docker uma imagem pré pronta do Postgres. Após ter essa imagem, execute o comando abaixo:

```bash
$ npm run start:db
```

Esse comando executará um script shell que irá criar uma nova instância da imagem do Postgres no Docker, utilizando das variáveis de ambientes configuradas no **Step 1** e da imagem pré pronta do Postgres.

Caso você já tenha rodado esse comando e possuo a instância do Postgres ativa, o próprio script matará essa instância e criará uma nova

### Step 3 - Start the apps
Para iniciar a aplicação, basta executar o comando abaixo:
```bash
$ npm run start:dev
```
Como estamos utilizando NestJS com MonoRepo, usamos a lib 'concurrently' para que através de uma única instrução, executamos o start dos dois apps (auth e crud) sem a necessidade de executar o 'npm start app app-name' duas vezes.

## Testes
Para teste, execute o comando abaixo:
```bash
# unit tests
$ npm test
```
Os casos de testes contemplam cenários de sucesso e erros, validandos seus retornos e chamadas.

## Validações
Para validar as informações enviadas nas requisições de forma simplificada, foi utlizado a lib [Joi](https://joi.dev) para realização de toda validação de tipagem, atributos obrigatórios, atributos não mapeados, etc. 



- Author - [Luan Eleuterio](https://kamilmysliwiec.com)

