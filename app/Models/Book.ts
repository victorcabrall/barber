import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  ManyToMany,
  beforeCreate,
  belongsTo,
  column,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'
import User from './User'
import Service from './Service'

export default class Book extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public date: Date

  @column()
  public userId: string

  @column()
  public confirmed: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @manyToMany(() => Service)
  public service: ManyToMany<typeof Service>

  @beforeCreate()
  public static addUuid(book: Book) {
    book.id = uuidv4()
  }
}
