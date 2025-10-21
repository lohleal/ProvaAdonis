import { BaseSeeder } from '@adonisjs/lucid/seeders'
import ContaCorrente from '#models/conta_corrente'
import Cliente from '#models/cliente'

function gerarNumeroContaAleatorio(): string {
  const parte1 = Math.floor(1000 + Math.random() * 9000)
  const parte2 = Math.floor(Math.random() * 10)
  return `${parte1}-${parte2}`
}

export default class ContaCorrenteSeeder extends BaseSeeder {
  public async run() {
    const clientes = await Cliente.all()

    for (const cliente of clientes) {
      let numeroConta: string

      do {
        numeroConta = gerarNumeroContaAleatorio()
      } while (
        await ContaCorrente.query().where('numero_conta', numeroConta).first()
      )

      await ContaCorrente.create({
        numeroConta,
        numeroAgencia: '2023',
        saldo: 1000,
        clienteId: cliente.id,
      })
    }
  }
}
