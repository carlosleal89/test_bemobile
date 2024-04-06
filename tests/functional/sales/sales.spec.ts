import { test } from '@japa/runner';
import User from '../../../app/models/user.js';
import { saleMock } from '../../mocks/sale_mock.js';

test.group('Testes para as rotas de vendas: ', (group) => {
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

  test('Testa se POST /api/sales/ cria uma nova venda : ', async ({ client }) => {
    const loginResponse = await client
    .post('/login')
    .json({
      email: 'test@example.com',
      password: 'password'
    })
    
    const token = loginResponse.body().token;

    const response = await client
    .post('/api/sales/')
    .header('Authorization', `Bearer ${token}`)
    .json(saleMock)

    response.assertStatus(201);
  })
})