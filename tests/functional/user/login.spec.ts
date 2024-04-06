import { test } from '@japa/runner';
// import { apiClient } from '@japa/api-client';
import User from '../../../app/models/user.js';
import hash from '@adonisjs/core/services/hash';

test.group('Testes para criação e login de usuário: ', (group) => {
  let user: any;
  group.each.setup(async () => {
    user = new User();
    user.password = 'stars';
    user.fullName = 'Nemesis';
    user.email = 'nemesis@umbrella.com'
    await user.save();
  })

  group.each.teardown(async () => {
    await user.delete();
  })
  test('Testa se a função de criptografa a senha funciona: ', async ({ assert }) => {
    assert.isTrue(hash.isValidHash(user.password));
    assert.isTrue(await hash.verify(user.password, 'stars'));
  });

  test('Testa se a função de criptografar retorna um erro com a senha incorreta: ', async ({ assert }) => {
    assert.isFalse(await hash.verify(user.password, 'jill'));
  });

  test('Testa se o sistema retorna um erro ao tentar cadastrar um usuário com o mesmo email: ', async ({ client }) => {
    const userData = {
      password: 'stars',
      fullName: 'Chris Redfield',
      email: 'nemesis@umbrella.com',
    }
    
    const response = await client.post('/signup').json(userData);
    response.assertStatus(409);
  });  
})

test.group('Testes para as rotas de clientes: ', (group) => {
  let user: any;
  group.each.setup(async () => {
    user = await User.create({
      fullName: 'testuser',
      email: 'test@example.com',
      password: 'password'
    });
  })

  group.each.teardown(async () => {
    await user.delete();
  })

  test('Testa se get /api/clients/ retorna o status 200: ', async ({ client }) => {
    const loginResponse = await client
    .post('/login')
    .json({
      email: 'test@example.com',
      password: 'password'
    })
    
    const token = loginResponse.body().token;

    const response = await client
    .get('/api/clients/')
    .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200);
  })

  test('Testa se get /api/clients/:id retorna o status 200: ', async ({ client }) => {
    const loginResponse = await client
    .post('/login')
    .json({
      email: 'test@example.com',
      password: 'password'
    })
    
    const token = loginResponse.body().token;

    const response = await client
    .get('/api/clients/1')
    .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200);
  })

  test('Testa se get /api/clients/:id retorna o status 404 ao não encontrar um cliente: ', async ({ client }) => {
    const loginResponse = await client
    .post('/login')
    .json({
      email: 'test@example.com',
      password: 'password'
    })
    
    const token = loginResponse.body().token;    

    const response = await client
    .get('/api/clients/100')
    .header('Authorization', `Bearer ${token}`)

    response.assertStatus(404);
    response.assertBody({ message: 'Cliente não encontrado' });
  })

  test('Testa se get /api/clients/ retorna o status 401 ao tentar fazer a requisição com um token invalido: ', async ({ client }) => {
    await client
    .post('/login')
    .json({
      email: 'test@example.com',
      password: 'password'
    })

    const response = await client
    .get('/api/clients/')
    .header('Authorization', `Bearer umtokenqualquer`);

    response.assertStatus(401);
  })
})

test.group('Testes para as rotas de produtos: ', (group) => {
  let user: any;
  group.each.setup(async () => {
    user = await User.create({
      fullName: 'testuser',
      email: 'test@example.com',
      password: 'password'
    });
  })

  group.each.teardown(async () => {
    await user.delete();
  })

  test('Testa se get /api/products/ retorna o status 200: ', async ({ client }) => {
    const loginResponse = await client
    .post('/login')
    .json({
      email: 'test@example.com',
      password: 'password'
    })
    
    const token = loginResponse.body().token;

    const response = await client
    .get('/api/products/')
    .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200);
  })

  test('Testa se get /api/products/ retorna o status 401 ao tentar fazer a requisição com um token invalido: ', async ({ client }) => {
    await client
    .post('/login')
    .json({
      email: 'test@example.com',
      password: 'password'
    })

    const response = await client
    .get('/api/products/')
    .header('Authorization', `Bearer umtokenqualquer`);

    response.assertStatus(401);
  })
})