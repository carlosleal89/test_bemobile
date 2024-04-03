import router from '@adonisjs/core/services/router';
const UsersController = () => import('../app/controllers/users_controller.js')

router.group(() => {
    router.post('/signup', [UsersController, 'signup']);
    router.post('/login', [UsersController, 'login']);
  }).prefix('/api');
