import { test } from '@japa/runner';
import { saleMock } from '../../mocks/sale_mock.js';

test.group('Testes para as rotas de vendas: ', () => {
  test('Testa se POST /api/sales/ cria uma nova venda : ', async ({ client }) => {
    const loginResponse = await client
    .post('/login')
    .json({
      email: 'alan@wake.com',
      password: 'secret'
    })
    
    const token = loginResponse.body().token;

    const response = await client
    .post('/api/sales/')
    .header('Authorization', `Bearer ${token}`)
    .json(saleMock)

    response.assertStatus(201);
  })
})