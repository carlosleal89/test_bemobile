import { BaseSeeder } from '@adonisjs/lucid/seeders';
import User from '../../app/models/user.js';

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        fullName: 'Alan Wake',
        email: 'alan@wake.com',
        password: 'secret',
      },
      {
        fullName: 'Alice Wake',
        email: 'alice@wake.com',
        password: 'supersecret',
      },
    ])
  }
}