import ContaCorrente from "#models/conta_corrente"
import Cliente from "#models/cliente"

export default class ContaCorrenteService {
  static async listarContas() {
    const contas = await ContaCorrente.query().preload('cliente')
    return contas.map(c => c.toJSON()) 
  }

  static async listarCliente() {
    return (await Cliente.all()).map(c => c.toJSON())
  }

  static async buscarConta(id: number) {
    const conta = await ContaCorrente.query()
      .where('id', id)
      .preload('cliente')
      .firstOrFail()
    return conta.toJSON()
  }

  static async criarConta(payload: any) {
    const conta = await ContaCorrente.create(payload)
    await conta.load('cliente')
    return conta.toJSON()
  }

  static async atualizarConta(id: number, payload: any) {
    const conta = await ContaCorrente.query()
      .where('id', id)
      .preload('cliente')
      .firstOrFail()
    conta.merge(payload)
    await conta.save()
    await conta.load('cliente')
    return conta.toJSON()
  }

  static async deletarConta(id: number) {
    const conta = await ContaCorrente.findOrFail(id)
    const data = conta.toJSON()
    await conta.delete()
    return data
  }
}