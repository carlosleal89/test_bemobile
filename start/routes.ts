const ClientsController = () => import('../app/controllers/clients_controller.js');
const UsersController = () => import('../app/controllers/users_controller.js');
import router from '@adonisjs/core/services/router';
import { middleware } from './kernel.js';
const AddressesController = () => import('../app/controllers/addresses_controller.js')

router.post('/signup', [UsersController, 'signup']);
router.post('/login', [UsersController, 'login']);

router.group(() => {
  router
    .resource('/clients', ClientsController)
    .apiOnly();
  router
    .resource('/address', AddressesController)
    .apiOnly();
  router.post('/address/:clientId', [AddressesController, 'insertAddressByClientId']);
  })
  .use([
    middleware.auth()
  ])
  .prefix('/api');
