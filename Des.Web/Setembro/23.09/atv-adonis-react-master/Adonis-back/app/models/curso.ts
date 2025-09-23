import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Aluno from './aluno.js'
import Disciplina from './disciplina.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Curso extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column()
  declare duracao: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relacionamentos
  @hasMany(() => Aluno, { foreignKey: 'curso_id' })
  declare alunos: HasMany<typeof Aluno>

  @hasMany(() => Disciplina, { foreignKey: 'curso_id' })
  declare disciplinas: HasMany<typeof Disciplina>
}
