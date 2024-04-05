import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Product from '../../app/models/product.js'

export default class extends BaseSeeder {
  async run() {
    await Product.createMany([
      {
        brand: 'Is Urban',
        model: 'Light Black 80',
        size: '40br',
        color: 'Preto',
        price: 999
      },
      {
        brand: 'Rollerblade',
        model: 'Twister XT',
        size: '42br',
        color: 'Azul',
        price: 1999
      },
      {
        brand: 'Hd Inline',
        model: 'Skull',
        size: '38br',
        color: 'Verde',
        price: 1999
      },
      {
        brand: 'Traxart',
        model: 'Revolt Street 2.0',
        size: '41br',
        color: 'Preto',
        price: 1249
      },

    ])
  }
}