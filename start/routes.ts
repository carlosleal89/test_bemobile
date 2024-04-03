/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { Route } from '@adonisjs/core/http';
import router from '@adonisjs/core/services/router';
import User from '../app/models/user.js';
const UsersController = () => import('../app/controllers/users_controller.js')

router.group(() => {
    router.post('/signup', [UsersController, 'signup']);
    router.post('/login', async ({ request }) => {
      const { email } = request.all();
      const user = await User.findByOrFail('email', email);

      // Verificar a senha do usuário
      // Implemente a lógica de verificação da senha aqui

      // Se o usuário foi autenticado com sucesso, emita um token para ele
      const token = await User.accessTokens.create(user);

      return {
        type: 'bearer',
        value: token.value!.release(),
      };
    })
  }).prefix('/api');
