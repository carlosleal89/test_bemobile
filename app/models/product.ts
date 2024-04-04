import { DateTime } from 'luxon';
import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare brand: string

  @column()
  declare model: string

  @column()
  declare size: string

  @column()
  declare color: string

  @column()
  declare price: number

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime

  @column.dateTime({ serializeAs: null })
  declare deletedAt: DateTime
}