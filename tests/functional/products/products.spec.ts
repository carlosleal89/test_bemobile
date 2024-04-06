import { test } from '@japa/runner'
import User from '../../../app/models/user.js';
import { productsList } from '../../mocks/product_mock.js';

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

  test('Testa se get /api/products/ retorna a lista de produtos: ', async ({ client }) => {
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

    response.assertBody(productsList);
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