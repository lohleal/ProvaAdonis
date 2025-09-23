import Curso from '#models/curso'

export default class CursoService {
  static async listarCursos() {
    return Curso.query().preload('disciplinas').preload('alunos')
  }

  static async buscarCurso(id: number) {
    return Curso.query()
      .where('id', id)
      .preload('disciplinas')
      .preload('alunos')
      .firstOrFail()
  }

  static async criarCurso(payload: any) {
    return Curso.create(payload)
  }

  static async atualizarCurso(id: number, payload: any) {
    const curso = await Curso.findOrFail(id)
    curso.merge(payload)
    await curso.save()
    return curso
  }

  static async deletarCurso(id: number) {
    const curso = await Curso.findOrFail(id)
    await curso.delete()
    return curso
  }
}
