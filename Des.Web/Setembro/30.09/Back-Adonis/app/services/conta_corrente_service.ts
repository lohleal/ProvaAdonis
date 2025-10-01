import ContaCorrente from "#models/conta_corrente"

export default class ContaCorrenteService {
  static async listarContas() {
    return ContaCorrente.all()
  }

  static async buscarConta(id: number) {
    return await ContaCorrente.findOrFail(id)
  }

  static async criarConta(payload: any) {
    return await ContaCorrente.create(payload)
  }

  static async atualizarConta(id: number, payload: any) {
    const conta: ContaCorrente = await ContaCorrente.findOrFail(id)
    conta.merge(payload)
    await conta.save()
    return conta
  }

  static async deletarConta(id: number) {
    const conta: ContaCorrente = await ContaCorrente.findOrFail(id)
    await conta.delete()
    return conta
  }
}