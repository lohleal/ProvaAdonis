import ContaCorrente from "#models/conta_corrente";
import AplicacaoFinanceira from "#models/aplicacao_financeira";

export default class ContaCorrenteService {
  static async listarContas() {
    const contas = await ContaCorrente.query().preload('cliente')
    return contas.map(c => c.toJSON())
  }

  static async buscarConta(id: number) {
    const conta = await ContaCorrente.findOrFail(id)
    await conta.load('cliente')
    return conta.toJSON()
  }

  static async criarConta(payload: any) {
  
    let numeroConta: string
    do {
      const numeroBase = Math.floor(1000 + Math.random() * 9000)
      const digito = Math.floor(Math.random() * 2)
      numeroConta = `${numeroBase}-${digito}`
    } while (await ContaCorrente.findBy('numeroConta', numeroConta))

    
    const conta = await ContaCorrente.create({
      ...payload,
      numeroConta,
      saldo: Number(payload.saldo) || 0  
    });
    console.log('Conta criada com saldo:', conta.saldo);  
    return conta.toJSON();

    
  }

  static async atualizarConta(id: number, payload: any) {
    const conta = await ContaCorrente.findOrFail(id)
    conta.merge(payload)
    await conta.save()
    return conta.toJSON()
  }

  static async deletarConta(id: number) {
    const conta = await ContaCorrente.findOrFail(id)

    if (Number(conta.saldo) !== 0) {
      throw new Error('Não é possível excluir uma conta com saldo diferente de zero.')
    }

    const aplicacoesAtivas = await AplicacaoFinanceira.query()
      .where('conta_corrente_id', id)
      .where('status', 'ativa')

    if (aplicacoesAtivas.length > 0) {
      throw new Error('Não é possível excluir conta com aplicações financeiras ativas.')
    }

    const data = conta.toJSON()
    await conta.delete()
    return data
  }
}
