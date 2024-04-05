import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Address from '../../app/models/address.js'

export default class extends BaseSeeder {
  async run() {
    await Address.createMany([
      {
        clientId: 1,
        street: 'Rua Raccoon',
        number: '2809',
        neighborhood: 'Umbrella Ville',
        city: 'Raccoon City',
        state: 'Kansas',
        country: 'Estados Unidos',
        postal_code: '66101-66160'
      },
      {
        clientId: 2,
        street: 'Rua Raccoon 2',
        number: '2909',
        neighborhood: 'Arklay Ville',
        city: 'Raccoon City',
        state: 'Kansas',
        country: 'Estados Unidos',
        postal_code: '66101-66160'
      }
    ])
  }
}