import { test } from '@japa/runner'

test.group('Testes de validação das requisiçoes.', () => {
  test('Testa a validação da rota POST /signup', async ({ client, assert }) => {
    const loginResponse = await client
    .post('/signup')
    .json({
      fullName: 'Al@n W@ke',
      email: 'alan@wake.com',
      password: 'secret'
    })

    const { errors } = loginResponse.body();
    assert.equal(errors[0].message, 'O campo fullName não aceita numeros ou caracteres especiais.')    
  })

  test('Testa a validação da rota POST /api/client', async ({ client, assert }) => {
    const loginResponse = await client
    .post('/login')
    .json({
      email: 'alan@wake.com',
      password: 'secret'
    })
    
    const token = loginResponse.body().token;

    const response = await client
    .post('/api/clients/')
    .header('Authorization', `Bearer ${token}`)
    .json({
      name: 'Tolkien',
      cpf: '1234543456X'
    })    
    
    const { errors } = response.body();
    assert.equal(errors[0].message, 'CPF com formato inválido. Deve ter 11 digitos e somente números.')    
  })
})