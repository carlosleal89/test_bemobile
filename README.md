# test_bemobile

Esta é aplicação é uma API restful desenvolvida com o framework AdonisJs utilizando a estrutura MVC. O banco de dados utilizado é o MySql e usa o Lucid como ORM.


A API possui rotas para cadastro de usuários do sistema e cadastro e gerenciamento de clientes, vendas e produtos.

## Para executar a aplicação:


O sistema depende do banco de dados que está configurado em um container Docker que precisa estar em execução para o correto funcionamento.


  1. Execute o comando para iniciar o banco de dados:

    docker-compose up --build    

  2. Instale as dependências na raiz do projeto:

    npm install

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


  * Este endpoint aceita requisições no formato JSON no seguinte formato:

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

   Bearer substituaEssaStringPeloToken


3. Cadastro de clientes: 

   /api/clients


* Endpoint do tipo POST que aceita requisições no formato JSON no seguinte formato:

    ```json
    {
     "name": "Alan Wake",
     "cpf": "01836426709"
    }
    ```


- O campo 'name' não aceita números ou caracteres especiais;

- O campo 'cpf' aceita strings formadas somente por números com 11 caracteres;

  Para facilitar o cadastro de clientes, a validação de CPF não é feita usando os algoritmos específicos para esse fim. Visto que são usados dados fictícios, é feito apenas uma validação simples.


4. Cadastro de endereço:

  Endpoint do tipo POST para cadastro de endereço para um cliente:

    /api/address


  Este endpoint aceita requisições no formato JSON no seguinte formato:

    ```json
    {
      "street": "Rua de Exemplo",
      "número": "15"
    }
    ```
