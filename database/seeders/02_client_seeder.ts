import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Client from '../../app/models/client.js'

export default class extends BaseSeeder {
  async run() {
    await Client.createMany([
      {
        name: 'Jill Valentine',
        cpf: '01854825698',
      },
      {
        name: 'Carlos Oliveira',
        cpf: '01889752419',
      }
    ])
  }
}