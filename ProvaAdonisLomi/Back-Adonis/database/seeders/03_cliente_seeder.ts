import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Cliente from '#models/cliente'

export default class ClienteSeeder extends BaseSeeder {
  public async run() {
    await Cliente.create({
      nome_completo: 'Ka',
      email: 'ka@gmail.com',
      senha: '123',
      cpf: '123.456.789-01',
      cidade: 'Paranaguá',
      estado: 'PR',
      rua: 'Flores',
      numero_casa: '123',
      id: 100,
    })
    
    await Cliente.create({
      nome_completo: 'Helo',
      email: 'helo@gmail.com',
      senha: '123',
      cpf: '113.464.129-01',
      cidade: 'Paranaguá',
      estado: 'PR',
      rua: 'Rua H',
      numero_casa: '382',
      id: 200,
    })    
  }
}