import { DateTime } from 'luxon';
import { BaseModel, beforeSave, column, hasMany } from '@adonisjs/lucid/orm';
import Address from './address.js';
import * as relations from '@adonisjs/lucid/types/relations';
import Phone from './phone.js';
import Sale from './sale.js';

export default class Client extends BaseModel {
  @hasMany(() => Address)
  declare addresses: relations.HasMany<typeof Address>

  @hasMany(() => Phone)
  declare phones: relations.HasMany<typeof Phone>

  @hasMany(() => Sale)
  declare sales: relations.HasMany<typeof Sale>

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare cpf: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime

  @beforeSave()
  static capitalizeName(user: Client) {
    user.name = user.name.split(' ').map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    }).join(' ')
  }
}