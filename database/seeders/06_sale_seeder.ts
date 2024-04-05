import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Sale from '../../app/models/sale.js'

export default class extends BaseSeeder {
  async run() {
    await Sale.createMany([
      {
        clientId: 1,
        productId: 4,
        quantity: 1,
        unitPrice: 1249,
        totalPrice: 1249,
      },
      {
        clientId: 2,
        productId: 1,
        quantity: 1,
        unitPrice: 999,
        totalPrice: 999,
      }
    ])
  }
}