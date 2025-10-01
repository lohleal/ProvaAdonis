import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Cliente from '#models/cliente'

export default class ClienteSeeder extends BaseSeeder {
  public async run() {
    await Cliente.create({
      nome_completo: 'Cliente 1',
      email: 'cliente1@teste.com',
      senha: '123456',
      cpf: '12345678901',
      cidade: 'Paranaguá',
      estado: 'PR',
      rua: 'Rua A',
      numero_casa: '123',
    })

    await Cliente.create({
      nome_completo: 'Cliente 2',
      email: 'cliente2@teste.com',
      senha: '123456',
      cpf: '12345678901',
      cidade: 'Paranaguá',
      estado: 'PR',
      rua: 'Rua A',
      numero_casa: '123',
    })
  }
}
