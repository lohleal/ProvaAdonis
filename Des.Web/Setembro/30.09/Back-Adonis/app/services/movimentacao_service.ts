import ContaCorrente from '#models/conta_corrente'
import Movimentacao from '#models/movimentacao'

export default class MovimentacaoService {
  static async listarMovimentacao() {
    return await Movimentacao.all()
  }

  static async buscarMovimentacao(id: number) {
    return await Movimentacao.findOrFail(id)
  }

  static async criarMovimentacao(payload: any) {
    // Usar transação para garantir consistência
    const trx = await Movimentacao.transaction()
    
    try {
      if (payload.tipo === 'saque' || payload.tipo === 'transferencia') {
        const conta = await ContaCorrente.findOrFail(payload.conta_origem_id, { client: trx })
        
        if (Number(conta.saldo) < Number(payload.valor)) {
          await trx.rollback()
          throw new Error('Saldo insuficiente')
        }
        
        // Atualizar saldo da conta origem
        conta.saldo = Number(conta.saldo) - Number(payload.valor)
        await conta.useTransaction(trx).save()

        // Se for transferência, creditar a conta destino
        if (payload.tipo === 'transferencia' && payload.conta_destino_id) {
          const contaDestino = await ContaCorrente.findOrFail(payload.conta_destino_id, { client: trx })
          contaDestino.saldo = Number(contaDestino.saldo) + Number(payload.valor)
          await contaDestino.useTransaction(trx).save()
        }
      }

      // Depósitos creditam na conta destino
      if (payload.tipo === 'deposito' && payload.conta_destino_id) {
        const contaDestino = await ContaCorrente.findOrFail(payload.conta_destino_id, { client: trx })
        contaDestino.saldo = Number(contaDestino.saldo) + Number(payload.valor)
        await contaDestino.useTransaction(trx).save()
      }

      // Aplicações debitam da conta origem
      if (payload.tipo === 'aplicacao' && payload.conta_origem_id) {
        const contaOrigem = await ContaCorrente.findOrFail(payload.conta_origem_id, { client: trx })
        
        if (Number(contaOrigem.saldo) < Number(payload.valor)) {
          await trx.rollback()
          throw new Error('Saldo insuficiente para aplicação')
        }
        
        contaOrigem.saldo = Number(contaOrigem.saldo) - Number(payload.valor)
        await contaOrigem.useTransaction(trx).save()
      }

      // Criar a movimentação
      const movimentacao = await Movimentacao.create(payload, { client: trx })
      
      // Commit da transação
      await trx.commit()
      
      return movimentacao
    } catch (error) {
      await trx.rollback()
      throw error
    }
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