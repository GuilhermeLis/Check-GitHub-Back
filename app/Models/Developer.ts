import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Developer extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public oid: string

  @column()
  public messageHeadline: string

  @column()
  public author: string

  @column()
  public committedDate: DateTime

  @column()
  public additions: number

  @column()
  public removals: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
