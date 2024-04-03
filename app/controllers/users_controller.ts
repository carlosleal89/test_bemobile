import type { HttpContext } from '@adonisjs/core/http'

import User from '../models/user.js';
import hash from '@adonisjs/core/services/hash'


export default class UsersController {
  async signup({request, response}: HttpContext) {
    try {
      const body = request.body();
      const newUser = await User.create(body);
      response.status(201)
      return {
        message: 'User created',
        data: newUser,
      };    
    } catch (error: any) {
      console.error(error.code)
      const errorMessage = error.code === 'ER_DUP_ENTRY' ? 'Usuário já existente' : error.message;
      return {
        message: errorMessage,
      };   
    }
  }

  async login({request, response}: HttpContext) {
    try {
      const { email, password } = request.all();
      const user = await User.findByOrFail('email', email);

      const passwordVerified = await hash.verify(user.password, password);

      if (!passwordVerified) {        
        return response.status(401).send({ error: 'Senha inválida' });
      }
      const token = await User.accessTokens.create(user);

      return {
        type: 'bearer',
        value: token.value!.release(),
      };
    } catch (error: any) {
      console.error(error.code)
      const errorMessage = error.code === 'E_ROW_NOT_FOUND' ? 'Usuário não encontrado' : error.message;
      return {
        message: errorMessage,
      };   
    }
  }
}
