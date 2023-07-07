import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  HasMany,
  beforeCreate,
  belongsTo,
  column,
  hasMany,
} from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'
import Service from './Service'

export default class SubService extends BaseModel {
  @column({ isPrimary: true })
  public id: string
  @column()
  public name: string

  @column()
  public description: string

  @column()
  public amount: number

  @column()
  public serviceId: string

  @belongsTo(() => Service)
  public service: BelongsTo<typeof Service>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static addUuid(subService: SubService) {
    subService.id = uuidv4()
  }
}
