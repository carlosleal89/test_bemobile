import { test } from '@japa/runner';
import { clientsList, clientDetailed } from '../../mocks/client_mock.js';

test.group('Testes para as rotas de clientes: ', () => {
  test('Testa se get /api/clients/ retorna o status 200: ', async ({ client }) => {
    const loginResponse = await client
    .post('/login')
    .json({
      email: 'alan@wake.com',
      password: 'secret'
    })
    
    const token = loginResponse.body().token;

    const response = await client
    .get('/api/clients/')
    .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200);
  })

  test('Testa se get /api/clients/ retorna a lista de clientes conforme esperado: ', async ({ client }) => {
    const loginResponse = await client
    .post('/login')
    .json({
      email: 'alan@wake.com',
      password: 'secret'
    })
    
    const token = loginResponse.body().token;

    const response = await client
    .get('/api/clients/')
    .header('Authorization', `Bearer ${token}`)

    response.assertBody(clientsList);
  })

  test('Testa se get /api/clients/:id retorna o status 200: ', async ({ client }) => {
    const loginResponse = await client
    .post('/login')
    .json({
      email: 'alan@wake.com',
      password: 'secret'
    })
    
    const token = loginResponse.body().token;

    const response = await client
    .get('/api/clients/1')
    .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200);
  })

  test('Testa se get /api/clients/:id detalha um cliente conforme esperado: ', async ({ client }) => {
    const loginResponse = await client
    .post('/login')
    .json({
      email: 'alan@wake.com',
      password: 'secret'
    })
    
    const token = loginResponse.body().token;

    const response = await client
    .get('/api/clients/1')
    .header('Authorization', `Bearer ${token}`)

    response.assertBody(clientDetailed);
  })

  test('Testa se get /api/clients/:id retorna o status 404 ao não encontrar um cliente: ', async ({ client }) => {
    const loginResponse = await client
    .post('/login')
    .json({
      email: 'alan@wake.com',
      password: 'secret'
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
      email: 'alan@wake.com',
      password: 'secret'
    })

    const response = await client
    .get('/api/clients/')
    .header('Authorization', `Bearer umtokenqualquer`);

    response.assertStatus(401);
  })
})