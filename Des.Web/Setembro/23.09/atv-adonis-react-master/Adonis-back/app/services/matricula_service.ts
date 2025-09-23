import Matricula from '#models/matricula'

export default class MatriculaService {
  static async listarMatriculas() {
    return Matricula.query().preload('aluno').preload('disciplina')
  }

  static async criarMatricula(payload: any) {
    return Matricula.create(payload)
  }

  static async buscarMatricula(alunoId: number, disciplinaId: number) {
    return Matricula.query()
      .where('aluno_id', alunoId)
      .where('disciplina_id', disciplinaId)
      .firstOrFail()
  }

  static async deletarMatricula(alunoId: number, disciplinaId: number) {
    const matricula = await this.buscarMatricula(alunoId, disciplinaId)
    await matricula.delete()
    return matricula
  }
}
