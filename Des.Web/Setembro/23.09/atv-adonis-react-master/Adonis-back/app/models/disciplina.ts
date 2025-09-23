import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, manyToMany } from '@adonisjs/lucid/orm'
import Curso from './curso.js'
import Aluno from './aluno.js'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Disciplina extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column()
  declare carga: number

  @column()
  declare curso_id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relacionamentos
  @belongsTo(() => Curso, { foreignKey: 'curso_id' })
  declare curso: BelongsTo<typeof Curso>

  @manyToMany(() => Aluno, { pivotTable: 'matriculas' })
  declare alunos: ManyToMany<typeof Aluno>
}
