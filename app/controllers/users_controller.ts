import type { HttpContext } from '@adonisjs/core/http'

import User from '../models/user.js';

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
}
