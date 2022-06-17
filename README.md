# Store Manager

Store Manager é uma API REST de gerenciamentos de vendas, pela qual é possível criar, visualizar, atualizar e excluir produtos e vendas.

## Tecnologias utilizadas

A aplicação foi desenvolvida utilizando o framework [Express](https://expressjs.com/) e o banco de dados [MySQL](https://www.mysql.com/), além do framework [Mocha](https://mochajs.org/) e das bibliotecas [Chai](https://www.chaijs.com/) e [Sinon.JS](https://sinonjs.org/) para criar os testes unitários.

Além disso, as camadas da aplicação foram separadas de acordo com a arquitetura do padrão MSC (Model-Service-Controller).

O banco de dados inicial, contido no arquivo `StoreManager.sql`, foi fornecido pela [Trybe](https://betrybe.com).

## Instalação das dependências

Você precisará das tecnologias de conteinerização [Docker](https://docs.docker.com/engine/install/) e [Docker Compose](https://docs.docker.com/compose/install/) instalados em sua máquina para executar a aplicação e seus testes.

## Como executar a aplicação

Com o repositório clonado e dentro de um terminal:

1. Entre na pasta do repositório:

```
cd store-manager
```

2. Execute a aplicação com o Docker Compose:

```
docker-compose up
```

**Na primeira execução, é possível que o serviço do banco de dados demore mais que o serviço da aplicação para iniciar, fazendo com que a API retorne erros de servidor ao receber requisições que precisem realizar consultas ao banco de dados. Neste caso, aguarde até que uma mensagem similiar à seguinte apareça no terminal:**

```
database_1  | 2022-04-30T19:12:50.094288Z 0 [Note] mysqld: ready for connections.
```

Para encerrar a aplicação, pressione as teclas `ctrl + C`.

Acesse a [documentação da linha de comando do Docker Compose](https://docs.docker.com/engine/reference/commandline/compose/#child-commands) para saber mais sobre os comandos disponíveis.

## Como executar os testes

Em um novo terminal, execute:

```
docker-compose run app npm test
```

## Documentação

### Listar produtos

Lista todos os produtos cadastrados.

O corpo da resposta contém um **array JSON** com objetos de informações dos produtos.

#### URL

```
GET http://localhost:3000/products
```

#### Parâmetros

Nenhum.

#### Campos da resposta

| Campo    | Tipo    | Descrição              |
| :------- | :------ | :--------------------- |
| id       | inteiro | ID do produto.         |
| name     | string  | Nome do produto.       |
| quantity | inteiro | Quantidade do produto. |

#### Códigos de status da resposta

| Código | Descrição                        |
| :----- | :------------------------------- |
| 200    | Produtos retornados com sucesso. |

#### Exemplo

Requisição:

```terminal
curl --request GET http://localhost:3000/products
```

Resposta:

```json
[
  {
    "id": 1,
    "name": "Martelo de Thor",
    "quantity": 10
  },
  {
    "id": 2,
    "name": "Traje de encolhimento",
    "quantity": 20
  },
  {
    "id": 3,
    "name": "Escudo do Capitão América",
    "quantity": 30
  }
]
```

---

### Listar produto por ID

Lista um produto especificado pelo seu ID.

O corpo da resposta contém um **objeto JSON** com as informações do produto.

#### URL

```
GET http://localhost:3000/products/{id}
```

#### Parâmetros

##### Path

| Parâmetro | Tipo    | Descrição      |
| :-------- | :------ | :------------- |
| id        | inteiro | ID do produto. |

#### Campos da resposta

| Campo    | Tipo    | Descrição              |
| :------- | :------ | :--------------------- |
| id       | inteiro | ID do produto.         |
| name     | string  | Nome do produto.       |
| quantity | inteiro | Quantidade do produto. |

#### Códigos de status da resposta

| Código | Descrição                      |
| :----- | :----------------------------- |
| 200    | Produto retornado com sucesso. |
| 404    | Produto não encontrado.        |

#### Exemplo

Requisição:

```terminal
curl --request GET http://localhost:3000/products/3
```

Resposta:

```json
{
  "id": 3,
  "name": "Escudo do Capitão América",
  "quantity": 30
}
```

---

### Cadastrar produto

Cadastra um produto.

O corpo da resposta contém um **objeto JSON** com as informações do produto cadastrado.

#### URL

```
POST http://localhost:3000/products
```

#### Parâmetros

##### Body

| Parâmetro | Tipo    | Descrição                                                      |
| :-------- | :------ | :------------------------------------------------------------- |
| name      | string  | Nome do produto. **Obrigatório**. Único. Mínimo: 5 caracteres. |
| quantity  | inteiro | Quantidade do produto. **Obrigatório**. Mínimo: 1              |

#### Campos da resposta

| Campo    | Tipo    | Descrição              |
| :------- | :------ | :--------------------- |
| id       | inteiro | ID do produto.         |
| name     | string  | Nome do produto.       |
| quantity | inteiro | Quantidade do produto. |

#### Códigos de status da resposta

| Código | Descrição                       |
| :----- | :------------------------------ |
| 201    | Produto cadastrado com sucesso. |
| 400    | Parâmetro ausente.              |
| 422    | Parâmetro inválido.             |

#### Exemplo

Requisição:

```terminal
curl --request POST http://localhost:3000/products \
--header 'Content-Type: application/json' \
--data '{
  "name": "produto",
  "quantity": 40
}'
```

Resposta:

```json
{
  "id": 4,
  "name": "produto",
  "quantity": 40
}
```

---

### Atualizar produto

Atualiza um produto especificado pelo seu ID.

O corpo da resposta contém um **objeto JSON** com as informações atualizadas do produto.

#### URL

```
PUT http://localhost:3000/products/{id}
```

#### Parâmetros

##### Path

| Parâmetro | Tipo    | Descrição                       |
| :-------- | :------ | :------------------------------ |
| id        | inteiro | ID do produto a ser atualizado. |

##### Body

| Parâmetro | Tipo    | Descrição                                                      |
| :-------- | :------ | :------------------------------------------------------------- |
| name      | string  | Nome do produto. **Obrigatório**. Único. Mínimo: 5 caracteres. |
| quantity  | inteiro | Quantidade do produto. **Obrigatório**. Mínimo: 1              |

#### Campos da resposta

| Campo    | Tipo    | Descrição              |
| :------- | :------ | :--------------------- |
| id       | inteiro | ID do produto.         |
| name     | string  | Nome do produto.       |
| quantity | inteiro | Quantidade do produto. |

#### Códigos de status da resposta

| Código | Descrição                       |
| :----- | :------------------------------ |
| 200    | Produto atualizado com sucesso. |
| 400    | Parâmetro ausente.              |
| 404    | Produto não encontrado.         |
| 422    | Parâmetro inválido.             |

#### Exemplo

Requisição:

```terminal
curl --request PUT http://localhost:3000/products/4 \
--header 'Content-Type: application/json' \
--data '{
  "name": "produto 2",
  "quantity": 50
}'
```

Resposta:

```json
{
  "id": 4,
  "name": "produto 2",
  "quantity": 50
}
```

---

### Excluir produto

Exclui um produto especificado pelo seu ID.

A resposta não possui conteúdo em seu corpo.

#### URL

```
DELETE http://localhost:3000/products/{id}
```

#### Parâmetros

##### Path

| Parâmetro | Tipo    | Descrição                     |
| :-------- | :------ | :---------------------------- |
| id        | inteiro | ID do produto a ser removido. |

#### Campos da resposta

Nenhum.

#### Códigos de status da resposta

| Código | Descrição                     |
| :----- | :---------------------------- |
| 204    | Produto excluído com sucesso. |
| 404    | Produto não encontrado.       |

#### Exemplo

Requisição:

```terminal
curl --head --request DELETE http://localhost:3000/products/4
```

Resposta:

```terminal
HTTP/1.1 204 No Content
X-Powered-By: Express
Date: Sat, 30 Apr 2022 22:10:04 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

---

### Listar vendas

Lista todas as vendas cadastradas.

O corpo da resposta contém um **array JSON** com objetos de informações das vendas.

#### URL

```
GET http://localhost:3000/sales
```

#### Parâmetros

Nenhum.

#### Campos da resposta

| Campo     | Tipo    | Descrição                      |
| :-------- | :------ | :----------------------------- |
| saleId    | inteiro | ID da venda.                   |
| productId | inteiro | ID do produto vendido.         |
| date      | string  | Data da venda.                 |
| quantity  | inteiro | Quantidade vendida do produto. |

#### Códigos de status da resposta

| Código | Descrição                      |
| :----- | :----------------------------- |
| 200    | Vendas retornadas com sucesso. |

#### Exemplo

Requisição:

```terminal
curl --request GET http://localhost:3000/sales
```

Resposta:

```json
[
  {
    "saleId": 1,
    "productId": 1,
    "date": "2022-04-30T19:12:41.000Z",
    "quantity": 5
  },
  {
    "saleId": 1,
    "productId": 2,
    "date": "2022-04-30T19:12:41.000Z",
    "quantity": 10
  },
  {
    "saleId": 2,
    "productId": 3,
    "date": "2022-04-30T19:12:41.000Z",
    "quantity": 15
  }
]
```

---

### Listar venda por ID

Lista uma venda especificada pelo seu ID.

O corpo da resposta contém um **array JSON** com objetos de informações da venda.

#### URL

```
GET http://localhost:3000/sales/{id}
```

#### Parâmetros

##### Path

| Parâmetro | Tipo    | Descrição    |
| :-------- | :------ | :----------- |
| id        | inteiro | ID da venda. |

#### Campos da resposta

| Campo     | Tipo    | Descrição                      |
| :-------- | :------ | :----------------------------- |
| productId | inteiro | ID do produto vendido.         |
| date      | string  | Data da venda.                 |
| quantity  | inteiro | Quantidade vendida do produto. |

#### Códigos de status da resposta

| Código | Descrição                    |
| :----- | :--------------------------- |
| 200    | Venda retornada com sucesso. |
| 404    | Venda não encontrada.        |

#### Exemplo

Requisição:

```terminal
curl --request GET http://localhost:3000/sales/1
```

Resposta:

```json
[
  {
    "productId": 1,
    "date": "2022-04-30T19:12:41.000Z",
    "quantity": 5
  },
  {
    "productId": 2,
    "date": "2022-04-30T19:12:41.000Z",
    "quantity": 10
  }
]
```

---

### Cadastrar venda

Cadastra uma venda.

O corpo da resposta contém um **objeto JSON** com as informações da venda cadastrada.

#### URL

```
POST http://localhost:3000/sales
```

#### Parâmetros

##### Body

O corpo da requisição deve ser um **array de objetos**.

| Parâmetro | Tipo    | Descrição                                                 |
| :-------- | :------ | :-------------------------------------------------------- |
| productId | inteiro | ID do produto vendido. **Obrigatório**.                   |
| quantity  | inteiro | Quantidade vendida do produto. **Obrigatório**. Mínimo: 1 |

#### Campos da resposta

| Campo               | Tipo             | Descrição                      |
| :------------------ | :--------------- | :----------------------------- |
| id                  | inteiro          | ID da venda.                   |
| itemsSold           | array de objetos | Contém os produtos vendidos.   |
| itemsSold.productId | inteiro          | ID do produto vendido.         |
| itemsSold.quantity  | inteiro          | Quantidade vendida do produto. |

#### Códigos de status da resposta

| Código | Descrição                     |
| :----- | :---------------------------- |
| 201    | Venda cadastrada com sucesso. |
| 400    | Parâmetro ausente.            |
| 422    | Parâmetro inválido.           |

#### Exemplo

Requisição:

```terminal
curl --request POST http://localhost:3000/sales \
--header 'Content-Type: application/json' \
--data '[
  {
    "productId": 1,
    "quantity": 2
  },
  {
    "productId": 2,
    "quantity": 5
  }
]'
```

Resposta:

```json
{
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 2
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
}
```

---

### Atualizar venda

Atualiza uma venda especificada pelo seu ID.

O corpo da resposta contém um **objeto JSON** com as informações atualizadas da venda.

#### URL

```
PUT http://localhost:3000/sales/{id}
```

#### Parâmetros

##### Path

| Parâmetro | Tipo    | Descrição                     |
| :-------- | :------ | :---------------------------- |
| id        | inteiro | ID da venda a ser atualizada. |

##### Body

O corpo da requisição deve ser um **array de objetos**.

| Parâmetro | Tipo    | Descrição                                                 |
| :-------- | :------ | :-------------------------------------------------------- |
| productId | inteiro | ID do produto vendido. **Obrigatório**.                   |
| quantity  | inteiro | Quantidade vendida do produto. **Obrigatório**. Mínimo: 1 |

#### Campos da resposta

| Campo                 | Tipo             | Descrição                      |
| :-------------------- | :--------------- | :----------------------------- |
| saleId                | inteiro          | ID da venda.                   |
| itemUpdated           | array de objetos | Contém os produtos vendidos.   |
| itemUpdated.productId | inteiro          | ID do produto vendido.         |
| itemUpdated.quantity  | inteiro          | Quantidade vendida do produto. |

#### Códigos de status da resposta

| Código | Descrição                     |
| :----- | :---------------------------- |
| 200    | Venda atualizada com sucesso. |
| 400    | Parâmetro ausente.            |
| 422    | Parâmetro inválido.           |

#### Exemplo

Requisição:

```terminal
curl --request PUT http://localhost:3000/sales/3 \
--header 'Content-Type: application/json' \
--data '[
  {
    "productId": 1,
    "quantity": 5
  },
  {
    "productId": 2,
    "quantity": 7
  }
]'
```

Resposta:

```json
{
  "saleId": 3,
  "itemUpdated": [
    {
      "productId": 1,
      "quantity": 5
    },
    {
      "productId": 2,
      "quantity": 7
    }
  ]
}
```

---

### Excluir venda

Exclui uma venda especificada pelo seu ID.

A resposta não possui conteúdo em seu corpo.

#### URL

```
DELETE http://localhost:3000/sales/{id}
```

#### Parâmetros

##### Path

| Parâmetro | Tipo    | Descrição                   |
| :-------- | :------ | :-------------------------- |
| id        | inteiro | ID da venda a ser removida. |

#### Campos da resposta

Nenhum.

#### Códigos de status da resposta

| Código | Descrição                   |
| :----- | :-------------------------- |
| 204    | Venda excluída com sucesso. |
| 404    | Venda não encontrada.       |

#### Exemplo

Requisição:

```terminal
curl --head --request DELETE http://localhost:3000/products/3
```

Resposta:

```terminal
HTTP/1.1 204 No Content
X-Powered-By: Express
Date: Sun, 01 May 2022 00:47:25 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

---
