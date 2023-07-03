import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'

export default class Payment extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public idTransaction: number

  @column()
  public amount: number

  @column()
  public typePayment: string

  @column()
  public bookId: string

  @column()
  public status: string
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static addUuid(payment: Payment) {
    payment.id = uuidv4()
  }
}
