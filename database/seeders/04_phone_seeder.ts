import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Phone from '../../app/models/phone.js'

export default class extends BaseSeeder {
  async run() {
    await Phone.createMany([
      {
        clientId: 1,
        phone: '48996002809'
      },
      {
        clientId: 2,
        phone: '48996005555'
      },
    ])
  }
}