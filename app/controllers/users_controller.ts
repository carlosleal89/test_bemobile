import type { HttpContext } from '@adonisjs/core/http';
import User from '../models/user.js';
import { signupValidator } from '../validators/user_validator.js';

export default class UsersController {
  async signup({request, response}: HttpContext) {
    await request.validateUsing(signupValidator);    
    try {
      const body = request.body();
      const newUser = await User.create(body);
      return response.status(201).send({
        message: 'Usuário criado',
        data: {
          nome: newUser.fullName,
          email: newUser.email,
        },
      });   
    } catch (error: any) {
      console.error(error.message)
      if (error.code === 'ER_DUP_ENTRY') {
        return response.status(409).send({ message: 'Email já cadastrado' });
      }
      return response.status(500)
        .send({ message: `Erro interno do servidor: ${error.message}` }); 
    }
  }

  async login({request, response, auth}: HttpContext) {
    try {
      const { email, password } = request.all();

      const user = await User.verifyCredentials(email, password);

      return await auth.use('jwt').generate(user);
    } catch (error: any) {
      console.error(error.code)
      if (error.code === 'E_INVALID_CREDENTIALS') {
        return response.status(401).send({ message: 'Email ou senha inválidos' });
      }
      return response.status(500)
        .send({ message: `Erro interno do servidor: ${error.message}` });  
    }
  }
}
