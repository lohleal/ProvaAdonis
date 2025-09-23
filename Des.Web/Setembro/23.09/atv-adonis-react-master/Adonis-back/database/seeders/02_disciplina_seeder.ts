import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Curso from '#models/curso'
import Disciplina from '#models/disciplina'

export default class extends BaseSeeder {
  async run() {
    const cursos = await Curso.all()
    for (const curso of cursos) {
      // Criar disciplinas para cada curso
      // EMI
      if (curso.id === 1) {
        await Disciplina.createMany([
          {
            nome: 'Linguagem de Programação',
            carga: 4,
            curso_id: curso.id,
          },
          {
            nome: 'Matemática I',
            carga: 3,
            curso_id: curso.id,
          },
        ])
      }
      //TADS
      else {
        await Disciplina.createMany([
          {
            nome: 'Programação Paralela e Distribuída',
            carga: 2,
            curso_id: curso.id,
          },
          {
            nome: 'Desenvolvimento Mobile',
            carga: 4,
            curso_id: curso.id,
          },
        ])
      }
    }
  }
}
