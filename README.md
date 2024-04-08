# test_bemobile

Esta aplicação é uma API restful desenvolvida com o framework AdonisJs utilizando a estrutura MVC. O banco de dados utilizado é o MySql e usa o Lucid como ORM.
Os testes foram desenvolvidos com Japa test runner.

A API possui rotas para cadastro de usuários do sistema e cadastro e gerenciamento de clientes, vendas e produtos.

## Para executar a aplicação:

* Requisitos:

  - Node na versão 20 ou superior;
  - Docker;


O banco de dados está configurado em um container Docker que precisa estar em execução para o correto funcionamento do sistema.

- A porta que o container do banco de dados utiliza é a 3306. Caso seja necessário é possivel alterar essa porta na variavel de ambiente DB_PORT e no arquivo 'Docker-compose.yml'.


  1. Instale as dependências na raiz do projeto:

    npm install

  2. Execute o comando para iniciar o banco de dados:

    docker-compose up --build

  3. Inicie o servidor:  

    npm run dev

  4. URL base da aplicação:

    http://localhost:3333


## Testes

  Foram implementados testes de funcionalidade na aplicação.
  
  * O comando abaixo executa os testes:

    
        npm run test


As rotas que dizem respeito a clientes, vendas e produtos precisam de autenticação via token JWT que deve ser enviado pelo header Authorization. 

Para obter o token é necessário cadastrar um usuário através do endpoint /signup. Após o cadastro, o usuário deve fazer o login pelo endpoint /login para obter o token de autenticação. 

Abaixo você irá encontrar mais informações sobre as rotas do sistema.


## Endpoints

A porta padrão para acesso das rotas é 3333, pode ser configurada alterando a variável de ambiente PORT, dentro do arquivo .env.

## Usuários

1. Cadastro de usuário:

    /signup


  * Este endpoint aceita requisições no formato JSON no seguinte formato:

    ```json
    {
     "fullName": "Usuário de Exemplo",
     "email": "user@example.com",
     "password": "secret"
    }

- O exemplo acima é um usuário já cadastrado no sistema e seus dados podem ser utilizados para fazer o login;

- O campo 'fullName' não aceita números ou caracteres especiais;

- O campo email irá retornar uma mensagem caso já exista um mesmo email cadastrado no sistema;

- O campo password deve conter no mínimo 5 caracteres;


2. Login:

   /login

  * Endpoint do tipo POST que aceita requisições no formato JSON no seguinte formato:

    ```json
    {
     "email": "user@example.com",
     "password": "secret"
    }
    ```

- O sistema faz a verificação dos dados e irá retornar o token de autenticação no formato JSON no corpo da resposta.
- Caso a validação não seja bem sucedida, o sistema irá retornar uma mensagem informando o motivo;


* As rotas abaixo necessitam do token de autenticação para aceitarem as requisições.

* O token deve ser enviado no header de autenticação 'Authorization' seguindo o exemplo:

   'Bearer substituaEssaStringPeloToken'

## Clientes

1. Cadastro de clientes: 

   /api/clients


* Endpoint do tipo POST que aceita requisições em JSON no seguinte formato:

    ```json
    {
     "name": "Alan Wake",
     "cpf": "01836426709"
    }
    ```

- O campo 'name' não aceita números ou caracteres especiais;
- O campo 'cpf' aceita strings formadas somente por números com 11 caracteres;

  Para facilitar o cadastro de clientes, a validação de CPF não é feita usando os algoritmos específicos para esse fim. Visto que são usados dados fictícios, é feito apenas uma validação simples.

2. Detalhar um cliente e suas vendas:

    /api/clients/:id

  * Endpoint do tipo GET que retorna os detalhes de um cliente e suas vendas;

  - Caso o id passado pelo parametro da URL não seja encontrado, o sistema irá retornar uma mensagem no corpo da resposta;
  - É possível filtrar as vendas por mês+ano passando esses valores via query string;

    Ex.:

    /api/clients/3/?month=4&year=2024

  - O sistema irá retornar somente as vendas do periodo especificado e, caso nenhuma venda seja encontrada, irá retornar uma mensagem informando;


3. Atualizar os dados de um cliente:

    /api/clients/:id

  * Endpoint do tipo PATCH que aceita requisições em JSON no seguinte formato:

      ```json
      {	
        "name": "Mr Scratch",
        "cpf": "08079758850"
      }
      ```

  - Caso o id passado pelo parametro da URL não seja encontrado, o sistema irá retornar uma mensagem no corpo da resposta;
  - Todos os campos possuem validação;

4. Excluir um cliente e suas vendas:

    /api/clients/:id

  * Endpoint do tipo DELETE que exclui o registro do cliente e de todas suas vendas;

  - Caso o id passado pelo parametro da URL não seja encontrado, o sistema irá retornar uma mensagem no corpo da resposta;


## Endereços

1. Cadastro de endereço:

    /api/address


  * Endpoint do tipo POST que aceita requisições no formato JSON no seguinte formato:

    ```json
    {	
      "addresses": [
        {
        "street": "Grove Street",
        "number": "66",
        "neighborhood": "Ganton",
        "city": "San Andreas",
        "state": "California",
        "country": "EUA",
        "postal_code": "88067-050"
        }
      ]	
    }
    ```

  - É possivel cadastrar mais de um endereço na mesma requisição, basta enviar outros endereços no array
  'addresses';
  - Todos os campos possuem validação;

2. Atualização de endereço:

    /api/address/:id

  * Endpoint do tipo PATCH que aceita requisição em JSON no seguinte formato:

    ```json
    {
      "street": "Grove Street",
      "number": "66",
      "neighborhood": "Ganton",
      "city": "San Andreas",
      "state": "California",
      "country": "EUA",
      "postal_code": "88067-050"
    }
    ```

   - Caso o id passado pelo parametro da URL não seja encontrado, o sistema irá uma mensagem no corpo da resposta;
   - Todos os campos possuem validação; 

3. Excluir um endereço:

    /api/address/:id

  * Endpoint do tipo DELETE;

  - Deve-se passar o id endereço que deve ser excluido;
  - Caso o id seja inválido, o sistema irá retornar uma mensagem no corpo da resposta;

## Telefones

1. Cadastro de telefones:

    /api/phones

  * Endpoint do tipo POST que aceita requisições em JSON no seguinte formato:

    ```json
    {	
        "phones": [
        {
        "phone": "48996234045"
        }
      ]	
    }
    ```

  - É possivel cadastrar mais de um telefone na mesma requisição, basta enviar outros telefones no array
  'phones';
  - O campo 'phone' aceita telefones com 10 ou 11 digitos, iniciando pelo DDD;
  - O campo 'phone' aceita strings formadas por numeros;

2. Atualização de telefone:

    /api/phones/:id

  * Endpoint do tipo PATCH que aceita requisições em JSON no seguinte formato:

    ```json
    {	
     "phone": "48996234045"
    }
    ```

  - O campo 'phone' aceita telefones com 10 ou 11 digitos, iniciando pelo DDD;
  - O campo 'phone' aceita strings formadas por numeros;
  - Caso o id seja inválido, o sistema irá retornar uma mensagem no corpo da resposta;

3. Excluir um telefone:

    /api/phones/:id

  * Endpoint do tipo DELETE;

  - Deve-se passar o id do telefone que deve ser excluido;
  - Caso o id seja inválido, o sistema irá retornar uma mensagem no corpo da resposta;

## Produtos

1. Listar produtos:

    /api/products

  * Endpoint do tipo GET;

  - Retorna uma lista de todos os produtos cadastrados;

2. Cadastro de produtos:

    /api/products/

  * Endpoint do tipo POST que aceita requisições em JSON no seguinte formato:

    ```json
    {
      "products": [
        {
          "brand": "Traxart",
          "model": "Revolt",
          "size": "40br",
          "color": "Preto",
          "price": 899
        }        		
      ]
    }
    ```
  - É possivel cadastrar mais de um produto na mesma requisição, basta enviar outros produtos no array "products";
  - Todos os campos possuem validação;

3. Atualizar um produto:

    /api/products/:id

  * Endpoint do tipo PATCH que aceita requisições em JSON no seguinte formato:

    ```json
    {
      "brand": "Traxart",
      "model": "Volt+",
      "size": "40br",
      "color": "Azul",
      "price": 1199
    }
    ```

  - Caso o id seja inválido, o sistema irá retornar uma mensagem no corpo da resposta;
  - Todos os campos possuem validação;

4. Excluir um produto:

    /api/products/:id

  * Endpoint do tipo DELETE que faz a 'soft delete' de um produto. O produto não é excluido permanentemente do banco de dados, mas é adicionado a data de exclusão na coluna 'deleted_at'. Dessa forma, caso seja necessário, é possivel utilizar o mesmo produto sem a necessidade de um novo cadastro, bastando apenas atribuir o valor de 'null' a coluna 'deleted_at';
  - Caso o id seja inválido, o sistema irá retornar uma mensagem no corpo da resposta;
  - Os produtos que passaram pelo processo de 'soft'delete' não aparecem na rota de listagem de produtos;


## Vendas

1. Cadastrar uma venda:

  /api/sales

  * Endpoint do tipo POST que aceita requisições em JSON no seguinte formato:

    ```json
    {	
      "clientId": "2",
      "productId": "3",
      "quantity": "1",
      "unitPrice": 899,
      "totalPrice": 899
    }
    ```
  - Caso o id em 'clienteId' seja inválido, o sistema irá retornar uma mensagem de erro no corpo da requisição;
  - Caso o id em 'productId' seja inválido, o sistema irá retornar uma mensagem de erro no corpo da requisição;
  - Todos os campos possuem validação;
  - Os valores de 'unitPrice' e 'totalPrice' são inseridos manualmente visando um sistema no qual seja possivel ao usuário conceder descontos a seus clientes. Inicialmente eu havia pensado em implementar uma lógica no qual a requisição iria ser enviada apenas com os campos de 'clientId', 'productId' e 'quantity' e então, visto que cada produto possui um preço cadastrado, o sistema ficaria a cargo de calcular os valor em 'totalPrice'. Como não havia regra de neǵocio para esse endpoint, resolvi deixar da forma que esta implementado.