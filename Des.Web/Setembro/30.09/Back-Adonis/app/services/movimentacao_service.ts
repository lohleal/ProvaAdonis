import ContaCorrente from "#models/conta_corrente"
import Movimentacao from "#models/movimentacao"

export default class MovimentacaoService {
  static async listarMovimentacoes() {
    return Movimentacao.all()
  }

  static async buscarMovimentacao(id: number) {
    return await Movimentacao.findOrFail(id)
  }

  static async criarMovimentacao(payload: any) {
    if(payload.tipo === 'saque' || payload.tipo === 'transferencia') {
      const conta = await ContaCorrente.findByOrFail(payload.conta_origem_id)
      if(conta.saldo < payload.valor) {
        throw new Error('Saldo insuficiente')
      }
    }
    return await Movimentacao.create(payload)
  }

  static async atualizarMovimentacao(id: number, payload: any) {
    const movimentacao = await Movimentacao.findOrFail(id)
    movimentacao.merge(payload)
    await movimentacao.save()
    return movimentacao
  }

  static async deletarMovimentacao(id: number) {
    const movimentacao = await Movimentacao.findOrFail(id)
    await movimentacao.delete()
    return movimentacao
  }
}