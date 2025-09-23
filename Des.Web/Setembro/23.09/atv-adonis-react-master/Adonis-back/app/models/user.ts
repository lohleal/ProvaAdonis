import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Papel from '#models/papel'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare papel_id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  /*
      DbAccessTokensProvider é um serviço (ou "provider") fornecido pelo
      AdonisJS para lidar com tokens de acesso que são persistidos em um
      banco de dados. Ele contém a lógica interna para criar, buscar
      e gerenciar os tokens.
  */
  static accessTokens = DbAccessTokensProvider.forModel(User)

  // Relacionamentos
  @belongsTo(() => Papel, { foreignKey: 'curso_id' })
  declare papel: BelongsTo<typeof Papel>
}
