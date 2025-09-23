import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Aluno from './aluno.js'
import Disciplina from './disciplina.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Matricula extends BaseModel {
  @column({ isPrimary: true })
  declare aluno_id: number

  @column({ isPrimary: true })
  declare disciplina_id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  // Relacionamentos
  @belongsTo(() => Aluno, { foreignKey: 'aluno_id' })
  declare aluno: BelongsTo<typeof Aluno>

  @belongsTo(() => Disciplina, { foreignKey: 'disciplina_id' })
  declare disciplina: BelongsTo<typeof Disciplina>
}
