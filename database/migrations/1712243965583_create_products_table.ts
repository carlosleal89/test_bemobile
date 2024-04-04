import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('brand').notNullable()
      table.string('model').notNullable()
      table.string('size').notNullable()
      table.string('color').notNullable()
      table.decimal('price', 10, 2).notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.dateTime('deleted_at').nullable().defaultTo(null)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}