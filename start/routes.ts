import router from '@adonisjs/core/services/router';
import ClientsController from '../app/controllers/clients_controller.js';
import { middleware } from './kernel.js';
const UsersController = () => import('../app/controllers/users_controller.js')

router.post('/signup', [UsersController, 'signup']);
router.post('/login', [UsersController, 'login']);

router.group(() => {
  router
    .resource('/clients', ClientsController)
    .apiOnly();
  })
  .use([
    middleware.auth()
  ])
  .prefix('/api');
