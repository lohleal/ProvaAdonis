import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Curso from '#models/curso'
import Aluno from '#models/aluno'

export default class extends BaseSeeder {
  async run() {
    const cursos = await Curso.all()

    for (const curso of cursos) {
      // Criar alunos para cada curso
      await Aluno.createMany([
        {
          nome: `Ana Luisa (${curso.nome})`,
          curso_id: curso.id,
        },
        {
          nome: `Luiz Eduardo (${curso.nome})`,
          curso_id: curso.id,
        },
      ])
    }
  }
}
