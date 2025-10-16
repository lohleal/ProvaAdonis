import { DateTime } from 'luxon'
import Hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Cliente from './cliente.js'
import Papel from './papel.js'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'

const AuthFinder = withAuthFinder(() => Hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'senha',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome_completo: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare senha: string

  @column()
  declare papel_id: number | null

  @column()
  declare cliente_id: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => Papel, { foreignKey: 'papel_id' })
  declare papel: BelongsTo<typeof Papel>

  @belongsTo(() => Cliente, { foreignKey: 'cliente_id' })
  declare cliente: BelongsTo<typeof Cliente>

  static accessTokens = DbAccessTokensProvider.forModel(User)
}

