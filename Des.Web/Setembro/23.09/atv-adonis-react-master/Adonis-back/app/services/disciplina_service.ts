import Disciplina from '#models/disciplina'
import Curso from '#models/curso'

export default class DisciplinaService {
  static async listarDisciplinas() {
    return Disciplina.query().preload('curso').preload('alunos')
  }

  static async buscarDisciplina(id: number) {
    return Disciplina.query()
      .where('id', id)
      .preload('curso')
      .preload('alunos')
      .firstOrFail()
  }

  static async criarDisciplina(payload: any) {
    return Disciplina.create(payload)
  }

  static async atualizarDisciplina(id: number, payload: any) {
    const disciplina = await Disciplina.findOrFail(id)
    disciplina.merge(payload)
    await disciplina.save()
    return disciplina
  }

  static async deletarDisciplina(id: number) {
    const disciplina = await Disciplina.findOrFail(id)
    await disciplina.delete()
    return disciplina
  }

  static async listarCursos() {
    return Curso.all()
  }
}