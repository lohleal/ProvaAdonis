import { BaseSeeder } from '@adonisjs/lucid/seeders'
import AplicacaoFinanceira from '#models/aplicacao_financeira'

export default class AplicacaoFinanceiraSeeder extends BaseSeeder {
  public async run() {
    await AplicacaoFinanceira.createMany([
      {
        valor: 1000,
        conta_corrente_id: 1,
        
      },
      {
        valor: 500,
        conta_corrente_id: 1,
        
      },
      {
        valor: 2000,
        conta_corrente_id: 2,
        
      },
    ])
  }
}