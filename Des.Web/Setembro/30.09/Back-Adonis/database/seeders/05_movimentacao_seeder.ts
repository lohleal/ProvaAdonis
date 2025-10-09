import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Movimentacao from '#models/movimentacao'
import { DateTime } from 'luxon'

export default class MovimentacaoSeeder extends BaseSeeder {
  public async run() {
    await Movimentacao.createMany([
      {
        tipo: 'deposito',
        valor: 1000.00,
        conta_origem_id: 1,
        conta_destino_id: 1, 
        descricao: 'Depósito inicial',
        data_movimentacao: DateTime.local(),
      },
      {
        tipo: 'saque',
        valor: 200.00,
        conta_origem_id: 1,
        conta_destino_id: null,
        descricao: 'Saque caixa eletrônico',
        data_movimentacao: DateTime.local(),
      },
      {
        tipo: 'transferencia',
        valor: 150.00,
        conta_origem_id: 1,
        conta_destino_id: 2, 
        descricao: 'Transferência PIX',
        data_movimentacao: DateTime.local(),
      },
    ])
  }
}