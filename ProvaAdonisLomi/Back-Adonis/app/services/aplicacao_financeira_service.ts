import AplicacaoFinanceira from '#models/aplicacao_financeira'
import ContaCorrente from '#models/conta_corrente'

export default class AplicacaoFinanceiraService {
  static async listarAplicacoes() {
    const aplicacoes = await AplicacaoFinanceira.query()
      .preload('contaCorrente', c => c.preload('cliente'))
    return aplicacoes.map(a => a.toJSON())
  }

  static async buscarAplicacao(id: number) {
    const aplicacao = await AplicacaoFinanceira.query()
      .where('id', id)
      .preload('contaCorrente', c => c.preload('cliente'))
      .firstOrFail()
    return aplicacao.toJSON()
  }

  static async criarAplicacao(payload: any) {
    const conta = await ContaCorrente.findOrFail(payload.conta_corrente_id)
    if (Number(conta.saldo) < Number(payload.valor)) throw new Error('Saldo insuficiente.')
    conta.saldo -= Number(payload.valor)
    await conta.save()

    const aplicacao = await AplicacaoFinanceira.create(payload)
    await aplicacao.load('contaCorrente', c => c.preload('cliente'))
    return aplicacao.toJSON()
  }

  static async atualizarAplicacao(id: number, payload: any) {
    const aplicacao = await AplicacaoFinanceira.query()
      .where('id', id)
      .preload('contaCorrente', c => c.preload('cliente'))
      .firstOrFail()

    const conta = await ContaCorrente.findOrFail(aplicacao.conta_corrente_id)

    const statusAnterior = aplicacao.status
    const statusNovo = payload.status

    if (statusAnterior === 'ativa' && statusNovo === 'resgatada') {
      conta.saldo = Number(conta.saldo) + Number(aplicacao.valor)
    }

    else if (statusAnterior === 'resgatada' && statusNovo === 'ativa') {
      if (Number(conta.saldo) < Number(aplicacao.valor)) {
        throw new Error('Saldo insuficiente para reativar a aplicação.')
      }
      conta.saldo = Number(conta.saldo) - Number(aplicacao.valor)
    }
    
    else if (payload.valor && statusAnterior === 'ativa' && statusNovo === 'ativa') {
      const diferenca = Number(payload.valor) - Number(aplicacao.valor)
      if (diferenca > 0 && Number(conta.saldo) < diferenca) {
        throw new Error('Saldo insuficiente para aumentar o valor da aplicação.')
      }
      conta.saldo = Number(conta.saldo) - diferenca
    }

    await conta.save()
    aplicacao.merge(payload)
    await aplicacao.save()
    await aplicacao.load('contaCorrente', c => c.preload('cliente'))
    return aplicacao.toJSON()
  }

  static async deletarAplicacao(id: number) {
    const aplicacao = await AplicacaoFinanceira.query()
      .where('id', id)
      .preload('contaCorrente')
      .firstOrFail()

    const conta = await ContaCorrente.findOrFail(aplicacao.conta_corrente_id)

    if (aplicacao.status === 'ativa') {
      const valorAplicacao = Number(aplicacao.valor) || 0
      conta.saldo = Number(conta.saldo) + valorAplicacao
      await conta.save()
    }

    await aplicacao.delete()

    return aplicacao.toJSON()
  }
}
