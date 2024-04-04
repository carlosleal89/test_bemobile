const ClientsController = () => import('../app/controllers/clients_controller.js');
const UsersController = () => import('../app/controllers/users_controller.js');
const SalesController = () => import('../app/controllers/sales_controller.js');
const PhonesController = () => import('../app/controllers/phones_controller.js');
const AddressesController = () => import('../app/controllers/addresses_controller.js');
const ProductsController = () => import('../app/controllers/products_controller.js');
import router from '@adonisjs/core/services/router';
import { middleware } from './kernel.js';

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
  router
    .resource('/phones', PhonesController)
    .apiOnly();
  router.post('/phones/:clientId', [PhonesController, 'insertPhoneByClientId']);
  router
    .resource('/sales', SalesController)
    .apiOnly();
  router
    .resource('/products', ProductsController)
    .apiOnly();
  })
  .use([
    middleware.auth()
  ])
  .prefix('/api');
