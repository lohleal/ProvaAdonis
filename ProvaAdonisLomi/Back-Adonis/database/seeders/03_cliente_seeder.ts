import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Cliente from '#models/cliente'

export default class ClienteSeeder extends BaseSeeder {
  public async run() {
    await Cliente.create({
      nome_completo: 'Ana',
      email: 'cliente1@teste.com',
      senha: '123456',
      cpf: '12345678901',
      cidade: 'Paranaguá',
      estado: 'PR',
      rua: 'Rua A',
      numero_casa: '123',
    })
    
    await Cliente.create({
      nome_completo: 'Helo',
      email: 'cliente2@teste.com',
      senha: '123456',
      cpf: '98765432100',
      cidade: 'Paranaguá',
      estado: 'PR',
      rua: 'Rua B',
      numero_casa: '456',
    })    
  }
}