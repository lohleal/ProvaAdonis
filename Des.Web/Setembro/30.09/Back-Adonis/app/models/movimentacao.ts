import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import ContaCorrente from './conta_corrente.js'

export default class Movimentacao extends BaseModel {
  static table = 'movimentacoes'
  
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare tipo: 'deposito' | 'saque' | 'transferencia' | 'aplicacao'

  @column()
  declare valor: number

  @column()
  declare conta_origem_id: number | null

  @column()
  declare conta_destino_id: number | null

  @column()
  declare descricao: string | null

  @column.dateTime()
  declare data_movimentacao: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => ContaCorrente, { foreignKey: 'conta_origem_id' })
  declare contaOrigem: BelongsTo<typeof ContaCorrente>

  @belongsTo(() => ContaCorrente, { foreignKey: 'conta_destino_id' })
  declare contaDestino: BelongsTo<typeof ContaCorrente>
}