import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, beforeCreate, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'
import Match from './Service'

export default class Message extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public senderId: string

  @column()
  public recipientId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Match)
  public match: BelongsTo<typeof Match>

  @beforeCreate()
  public static addUuid(message: Message) {
    message.id = uuidv4()
  }
}
