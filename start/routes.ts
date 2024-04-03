import router from '@adonisjs/core/services/router';
const UsersController = () => import('../app/controllers/users_controller.js')

router.post('/signup', [UsersController, 'signup']);
router.post('/login', [UsersController, 'login']);

router.group(() => {
  }).prefix('/api');
