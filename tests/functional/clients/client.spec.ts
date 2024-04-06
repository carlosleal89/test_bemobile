import { test } from '@japa/runner'
import User from '../../../app/models/user.js';

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