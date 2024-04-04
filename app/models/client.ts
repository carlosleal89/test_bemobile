import { DateTime } from 'luxon';
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm';
import Address from './address.js';
import * as relations from '@adonisjs/lucid/types/relations';
import Phone from './phone.js';

export default class Client extends BaseModel {
  @hasMany(() => Address)
  declare addresses: relations.HasMany<typeof Address>

  @hasMany(() => Phone)
  declare phones: relations.HasMany<typeof Phone>

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare cpf: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}