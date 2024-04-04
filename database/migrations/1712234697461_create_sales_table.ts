import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'sales'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('client_id')
        .unsigned()
        .references('clients.id')
        .onDelete('CASCADE')
        .notNullable()
      table.integer('product_id')
        // .unsigned()
        // .references('products.id')
        // .notNullable()
      table.integer('quantity')
      table.decimal('unit_price', 10, 2).notNullable()
      table.decimal('total_price', 10 ,2).notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}