import Movimentacao from '#models/movimentacao'
import ContaCorrente from '#models/conta_corrente'

export default class MovimentacaoService {

  // Listar todas movimentações
  static async listarMovimentacoes() {
    const movimentacoes = await Movimentacao.query()
      .preload('contaOrigem', c => c.preload('cliente'))
      .preload('contaDestino', c => c.preload('cliente'))
    return movimentacoes.map(m => m.toJSON())
  }

  // Buscar movimentação por ID
  static async buscarMovimentacao(id: number) {
    const movimentacao = await Movimentacao.query()
      .where('id', id)
      .preload('contaOrigem', c => c.preload('cliente'))
      .preload('contaDestino', c => c.preload('cliente'))
      .firstOrFail()
    return movimentacao.toJSON()
  }

  // Criar movimentação
  static async criarMovimentacao(payload: any) {
    const { tipo, valor, conta_origem_id, conta_destino_id } = payload

    const contaOrigem = await ContaCorrente.findOrFail(conta_origem_id)
    let contaDestino = null

    if (tipo === 'transferencia') {
      contaDestino = await ContaCorrente.findOrFail(conta_destino_id)
    }

    // Verificar saldo para saque e transferência
    if ((tipo === 'saque' || tipo === 'transferencia') && contaOrigem.saldo < Number(valor)) {
      throw new Error('Saldo insuficiente na conta de origem.')
    }

    // Atualizar saldo das contas
    switch (tipo) {
      case 'deposito':
        contaOrigem.saldo += Number(valor)
        await contaOrigem.save()
        break
      case 'saque':
        contaOrigem.saldo -= Number(valor)
        await contaOrigem.save()
        break
      case 'transferencia':
        contaOrigem.saldo -= Number(valor)
        contaDestino!.saldo += Number(valor)
        await contaOrigem.save()
        await contaDestino!.save()
        break
    }

    // Criar movimentação com conta_destino_id apenas se for transferência
    const movPayload = {
      tipo,
      valor: Number(valor),
      conta_origem_id,
      conta_destino_id: tipo === 'transferencia' ? conta_destino_id : null,
      descricao: payload.descricao,
      data_movimentacao: payload.data_movimentacao
    }

    const movimentacao = await Movimentacao.create(movPayload)
    await movimentacao.load('contaOrigem', c => c.preload('cliente'))
    await movimentacao.load('contaDestino', c => c.preload('cliente'))
    return movimentacao.toJSON()
  }

  // Atualizar movimentação
  static async atualizarMovimentacao(id: number, payload: any) {
    const movimentacao = await Movimentacao.findOrFail(id)
    const contaOrigemAntiga = await ContaCorrente.findOrFail(movimentacao.contaOrigemId)
    let contaDestinoAntiga = null
    if (movimentacao.contaDestinoId) {
      contaDestinoAntiga = await ContaCorrente.findOrFail(movimentacao.contaDestinoId)
    }

    // Reverter saldo antigo
    switch (movimentacao.tipo) {
      case 'deposito':
        contaOrigemAntiga.saldo -= movimentacao.valor
        await contaOrigemAntiga.save()
        break
      case 'saque':
        contaOrigemAntiga.saldo += movimentacao.valor
        await contaOrigemAntiga.save()
        break
      case 'transferencia':
        contaOrigemAntiga.saldo += movimentacao.valor
        if (contaDestinoAntiga) {
          contaDestinoAntiga.saldo -= movimentacao.valor
          await contaDestinoAntiga.save()
        }
        await contaOrigemAntiga.save()
        break
    }

    // Aplicar novos valores
    movimentacao.merge(payload)
    await movimentacao.save()

    // Atualizar saldo novo
    const contaOrigemNova = await ContaCorrente.findOrFail(movimentacao.contaOrigemId)
    let contaDestinoNova = null
    if (movimentacao.contaDestinoId) {
      contaDestinoNova = await ContaCorrente.findOrFail(movimentacao.contaDestinoId)
    }

    // Verificar saldo antes de aplicar
    if ((movimentacao.tipo === 'saque' || movimentacao.tipo === 'transferencia') && contaOrigemNova.saldo < movimentacao.valor) {
      throw new Error('Saldo insuficiente na conta de origem.')
    }

    // Aplicar saldo novo
    switch (movimentacao.tipo) {
      case 'deposito':
        contaOrigemNova.saldo += movimentacao.valor
        await contaOrigemNova.save()
        break
      case 'saque':
        contaOrigemNova.saldo -= movimentacao.valor
        await contaOrigemNova.save()
        break
      case 'transferencia':
        contaOrigemNova.saldo -= movimentacao.valor
        if (contaDestinoNova) {
          contaDestinoNova.saldo += movimentacao.valor
          await contaDestinoNova.save()
        }
        await contaOrigemNova.save()
        break
    }

    await movimentacao.load('contaOrigem', c => c.preload('cliente'))
    await movimentacao.load('contaDestino', c => c.preload('cliente'))
    return movimentacao.toJSON()
  }

  // Deletar movimentação
  static async deletarMovimentacao(id: number) {
    const movimentacao = await Movimentacao.findOrFail(id)
    const contaOrigem = await ContaCorrente.findOrFail(movimentacao.contaOrigemId)
    let contaDestino = null
    if (movimentacao.contaDestinoId) {
      contaDestino = await ContaCorrente.findOrFail(movimentacao.contaDestinoId)
    }

    // Reverter saldo
    switch (movimentacao.tipo) {
      case 'deposito':
        contaOrigem.saldo -= movimentacao.valor
        await contaOrigem.save()
        break
      case 'saque':
        contaOrigem.saldo += movimentacao.valor
        await contaOrigem.save()
        break
      case 'transferencia':
        contaOrigem.saldo += movimentacao.valor
        if (contaDestino) {
          contaDestino.saldo -= movimentacao.valor
          await contaDestino.save()
        }
        await contaOrigem.save()
        break
    }

    await movimentacao.delete()
    return movimentacao.toJSON()
  }
}