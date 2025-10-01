import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany } from '@adonisjs/lucid/orm'
import Cliente from './cliente.js'
import Movimentacao from './movimentacao.js'
import AplicacaoFinanceira from './aplicacaoFinanceira.js'

export default class ContaCorrente extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare numero_conta: string

  @column()
  declare numero_agencia: string

  @column()
  declare saldo: number

  @column()
  declare cliente_id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Cliente)
  declare cliente: BelongsTo<typeof Cliente>

  @hasMany(() => Movimentacao, { foreignKey: 'conta_origem_id' })
  declare movimentacoesOrigem: HasMany<typeof Movimentacao>

  @hasMany(() => Movimentacao, { foreignKey: 'conta_destino_id' })
  declare movimentacoesDestino: HasMany<typeof Movimentacao>

  @hasMany(() => AplicacaoFinanceira)
  declare aplicacoes: HasMany<typeof AplicacaoFinanceira>
}
