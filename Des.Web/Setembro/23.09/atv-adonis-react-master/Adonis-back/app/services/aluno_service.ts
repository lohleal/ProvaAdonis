import Aluno from '#models/aluno'
import Curso from '#models/curso'

export default class AlunoService {
  static async listarAlunos() {
    return Aluno.query().preload('curso').preload('disciplinas')
  }

  static async buscarAluno(id: number) {
    return Aluno.query()
      .where('id', id)
      .preload('curso')
      .preload('disciplinas')
      .firstOrFail()
  }

  static async criarAluno(payload: any) {
    return Aluno.create(payload)
  }

  static async atualizarAluno(id: number, payload: any) {
    const aluno = await Aluno.findOrFail(id)
    aluno.merge(payload)
    await aluno.save()
    return aluno
  }

  static async deletarAluno(id: number) {
    const aluno = await Aluno.findOrFail(id)
    await aluno.delete()
    return aluno
  }

  static async listarCursos() {
    return Curso.all()
  }
}