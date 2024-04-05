import { test } from '@japa/runner';
import { apiClient } from '@japa/api-client';
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

  // test('Testa se o sistema cadastra um novo usuário: ', async ({ client }) => {
  //   const userData = {
  //     password: 'stars',
  //     fullName: 'Chris Redfield',
  //     email: 'tesdte@stars.com',
  //   }
    
  //   const response = await client.post('/signup').json(userData);
  //   console.log(response.body);
    
  //   response.assertStatus(201);
  // })
})