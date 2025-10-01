import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@adonisjs/lucid/orm'
import ContaCorrente from './conta_corrente.js'

export default class AplicacaoFinanceira extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare tipo: 'poupanca' | 'titulos_governo' | 'acoes'

  @column()
  declare valor: number

  @column()
  declare status: 'ativa' | 'resgatada'

  @column()
  declare conta_corrente_id: number

  @belongsTo(() => ContaCorrente)
  declare conta_corrente: BelongsTo<typeof ContaCorrente>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}