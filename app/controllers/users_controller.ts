import type { HttpContext } from '@adonisjs/core/http';
import User from '../models/user.js';
import hash from '@adonisjs/core/services/hash';


export default class UsersController {
  async signup({request, response}: HttpContext) {
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
      const errorMessage = error.code === 'ER_DUP_ENTRY' ?
        'Usuário já existente'
        : error.message;
      return response.status(409).send({
        message: errorMessage,
      });  
    }
  }

  async login({request, response, auth}: HttpContext) {
    try {
      const { email, password } = request.all();
      const user = await User.verifyCredentials(email, password);

      const passwordVerified = await hash.verify(user.password, password);

      if (!passwordVerified) {        
        return response.status(401).send({ error: 'Senha inválida' });
      }
      return await auth.use('jwt').generate(user);
    } catch (error: any) {
      console.error(error.code)
      const errorMessage = error.code === 'E_ROW_NOT_FOUND' ?
        'Usuário não encontrado'
        : error.message;
      return response.status(200).send({
        message: errorMessage,
      });  
    }
  }
}
