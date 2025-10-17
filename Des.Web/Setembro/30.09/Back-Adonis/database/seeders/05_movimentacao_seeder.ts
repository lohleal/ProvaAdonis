import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Movimentacao from '#models/movimentacao'
import { DateTime } from 'luxon'

export default class MovimentacaoSeeder extends BaseSeeder {
  public async run() {
    await Movimentacao.createMany([
      {
        tipo: 'transferencia',
        valor: 150.0,
        contaOrigemId: 1,
        contaDestinoId: 2,
        cpfDestinatario: '12345678901',
        dataMovimentacao: DateTime.local(),
      },
      {
        tipo: 'transferencia',
        valor: 300.0,
        contaOrigemId: 2,
        contaDestinoId: 1,
        cpfDestinatario: '98765432100',
        dataMovimentacao: DateTime.local(),
      },
    ])
  }
}