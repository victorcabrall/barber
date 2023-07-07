import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, beforeCreate, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'
import Book from './Book'
import Service from './Service'

export default class BookService extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public bookId: string

  @column()
  public serviceId: string

  @belongsTo(() => Book)
  public book: BelongsTo<typeof Book>

  @belongsTo(() => Service)
  public service: BelongsTo<typeof Service>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static addUuid(bookService: BookService) {
    bookService.id = uuidv4()
  }
}
