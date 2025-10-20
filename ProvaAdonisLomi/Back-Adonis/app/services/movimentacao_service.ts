import Movimentacao from '#models/movimentacao'
import ContaCorrente from '#models/conta_corrente'

export default class MovimentacaoService {
  static async listarMovimentacoes() {
    const movimentacoes = await Movimentacao.query()
      .preload('contaOrigem', (query) => query.preload('cliente'))
      .preload('contaDestino', (query) => query.preload('cliente'))
    return movimentacoes.map(m => m.serialize())
  }

  static async buscarMovimentacao(id: number) {
    const movimentacao = await Movimentacao.query()
      .where('id', id)
      .preload('contaOrigem', (query) => query.preload('cliente'))
      .preload('contaDestino', (query) => query.preload('cliente'))
      .firstOrFail()
    return movimentacao.serialize()
  }

  static async criarMovimentacao(payload: any) {
    const contaOrigem = await ContaCorrente.findOrFail(payload.conta_origem_id)
    const contaDestino = await ContaCorrente.findOrFail(payload.conta_destino_id)

    if (Number(contaOrigem.saldo) < Number(payload.valor)) {
      throw new Error('Saldo insuficiente.')
    }

    contaOrigem.saldo = Number(contaOrigem.saldo) - Number(payload.valor)
    contaDestino.saldo = Number(contaDestino.saldo) + Number(payload.valor)

    await contaOrigem.save()
    await contaDestino.save()

    await contaDestino.load('cliente')
    const cpfDestinatario = contaDestino.cliente?.cpf || ''

    const movimentacao = await Movimentacao.create({
      tipo: 'transferencia',
      valor: payload.valor,
      contaOrigemId: payload.conta_origem_id,
      contaDestinoId: payload.conta_destino_id,
      cpfDestinatario: cpfDestinatario,
    })

    await movimentacao.load('contaOrigem', (query) => query.preload('cliente'))
    await movimentacao.load('contaDestino', (query) => query.preload('cliente'))

    return movimentacao.serialize()
  }

  static async atualizarMovimentacao(id: number, payload: any) {
    const movimentacao = await Movimentacao.findOrFail(id)

    /*movimentacao.merge({
      dataMovimentacao: payload.data_movimentacao || movimentacao.dataMovimentacao,
    })*/

    await movimentacao.save()
    await movimentacao.load('contaOrigem', (query) => query.preload('cliente'))
    await movimentacao.load('contaDestino', (query) => query.preload('cliente'))

    return movimentacao.serialize()
  }

  static async deletarMovimentacao(id: number) {
    const movimentacao = await Movimentacao.findOrFail(id)

    const contaOrigem = await ContaCorrente.findOrFail(movimentacao.contaOrigemId)
    const contaDestino = await ContaCorrente.findOrFail(movimentacao.contaDestinoId)

    contaOrigem.saldo = Number(contaOrigem.saldo) + Number(movimentacao.valor)
    contaDestino.saldo = Number(contaDestino.saldo) - Number(movimentacao.valor)

    await contaOrigem.save()
    await contaDestino.save()
    await movimentacao.delete()

    return movimentacao.serialize()
  }
}