import AplicacaoFinanceira from '#models/aplicacao_financeira'

export default class AplicacaoFinanceiraService {
  static async listarAplicacaoFinanceira() {
    return AplicacaoFinanceira.all()
  }

  static async buscarAplicacaoFinanceira(id: number) {
    return AplicacaoFinanceira.findOrFail(id)
  }

  static async criarAplicacaoFinanceira(payload: any) {
    return AplicacaoFinanceira.create(payload)
  }

  static async atualizarAplicacaoFinanceira(id: number, payload: any) {
    const aplicacao = await AplicacaoFinanceira.findOrFail(id)
    aplicacao.merge(payload)
    await aplicacao.save()
    return aplicacao
  }

  static async deletarAplicacaoFinanceira(id: number) {
    const aplicacao = await AplicacaoFinanceira.findOrFail(id)
    await aplicacao.delete()
    return aplicacao
  }
}
