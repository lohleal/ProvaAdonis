import ContaCorrente from '#models/conta_corrente'
import Movimentacao from '#models/movimentacao'

export default class MovimentacaoService {
  static async listarMovimentacao() {
    return await Movimentacao.query()
      .preload('contaOrigem', c => c.preload('cliente'))
      .preload('contaDestino', c => c.preload('cliente'))
  }

  static async buscarMovimentacao(id: number) {
    return await Movimentacao.query()
      .where('id', id)
      .preload('contaOrigem', c => c.preload('cliente'))
      .preload('contaDestino', c => c.preload('cliente'))
      .firstOrFail()
  }

  static async criarMovimentacao(payload: any) {
    const { tipo, valor, conta_origem_id, conta_destino_id } = payload

    const trx = await Movimentacao.transaction()
    try {
      if (tipo === 'saque' || tipo === 'transferencia' || tipo === 'aplicacao') {
        const contaOrigem = await ContaCorrente.findOrFail(conta_origem_id, { client: trx })
        if (Number(contaOrigem.saldo) < Number(valor)) throw new Error('Saldo insuficiente.')
        contaOrigem.saldo -= Number(valor)
        await contaOrigem.useTransaction(trx).save()
      }

      if (tipo === 'deposito' || tipo === 'transferencia') {
        if (!conta_destino_id) throw new Error('Conta destino obrigatória.')
        const contaDestino = await ContaCorrente.findOrFail(conta_destino_id, { client: trx })
        contaDestino.saldo += Number(valor)
        await contaDestino.useTransaction(trx).save()
      }

      const movimentacao = await Movimentacao.create(payload, { client: trx })
      await trx.commit()

      await movimentacao.load('contaOrigem', c => c.preload('cliente'))
      await movimentacao.load('contaDestino', c => c.preload('cliente'))

      return movimentacao
    } catch (err) {
      await trx.rollback()
      throw err
    }
  }

  static async atualizarMovimentacao(id: number, payload: any) {
    const trx = await Movimentacao.transaction()
    try {
      const mov = await Movimentacao.findOrFail(id, { client: trx })
      const { tipo, valor, conta_origem_id, conta_destino_id } = payload

      // Reverte saldo antigo
      if (mov.tipo === 'saque' || mov.tipo === 'transferencia' || mov.tipo === 'aplicacao') {
        const contaOrigem = await ContaCorrente.findOrFail(mov.conta_origem_id, { client: trx })
        contaOrigem.saldo += Number(mov.valor)
        await contaOrigem.useTransaction(trx).save()
      }

      if (mov.tipo === 'deposito' || mov.tipo === 'transferencia') {
        const contaDestino = await ContaCorrente.findOrFail(mov.conta_destino_id, { client: trx })
        contaDestino.saldo -= Number(mov.valor)
        await contaDestino.useTransaction(trx).save()
      }

      // Aplica nova movimentação
      if (tipo === 'saque' || tipo === 'transferencia' || tipo === 'aplicacao') {
        const contaOrigem = await ContaCorrente.findOrFail(conta_origem_id, { client: trx })
        if (Number(contaOrigem.saldo) < Number(valor)) throw new Error('Saldo insuficiente.')
        contaOrigem.saldo -= Number(valor)
        await contaOrigem.useTransaction(trx).save()
      }

      if (tipo === 'deposito' || tipo === 'transferencia') {
        const contaDestino = await ContaCorrente.findOrFail(conta_destino_id, { client: trx })
        contaDestino.saldo += Number(valor)
        await contaDestino.useTransaction(trx).save()
      }

      mov.merge(payload)
      await mov.useTransaction(trx).save()
      await trx.commit()

      await mov.load('contaOrigem', c => c.preload('cliente'))
      await mov.load('contaDestino', c => c.preload('cliente'))

      return mov
    } catch (err) {
      await trx.rollback()
      throw err
    }
  }

  static async deletarMovimentacao(id: number) {
    const trx = await Movimentacao.transaction()
    try {
      const mov = await Movimentacao.findOrFail(id, { client: trx })

      // Reverte saldo
      if (mov.tipo === 'saque' || mov.tipo === 'transferencia' || mov.tipo === 'aplicacao') {
        const contaOrigem = await ContaCorrente.findOrFail(mov.conta_origem_id, { client: trx })
        contaOrigem.saldo += Number(mov.valor)
        await contaOrigem.useTransaction(trx).save()
      }

      if (mov.tipo === 'deposito' || mov.tipo === 'transferencia') {
        const contaDestino = await ContaCorrente.findOrFail(mov.conta_destino_id, { client: trx })
        contaDestino.saldo -= Number(mov.valor)
        await contaDestino.useTransaction(trx).save()
      }

      await mov.delete()
      await trx.commit()
      return mov
    } catch (err) {
      await trx.rollback()
      throw err
    }
  }
}