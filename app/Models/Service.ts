import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  HasMany,
  beforeCreate,
  belongsTo,
  column,
  hasMany,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'
import Book from './Book'

export default class Service extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Book)
  public books: ManyToMany<typeof Book>

  @beforeCreate()
  public static addUuid(service: Service) {
    service.id = uuidv4()
  }
}
