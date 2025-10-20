import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Cliente from '#models/cliente'

export default class ClienteSeeder extends BaseSeeder {
  public async run() {
    await Cliente.create({
      nome_completo: 'Ka',
      email: 'ka@gmail.com',
      senha: '123',
      cpf: '12345678901',
      cidade: 'Paranaguá',
      estado: 'PR',
      rua: 'Flores',
      numero_casa: '123',
    })
    
    await Cliente.create({
      nome_completo: 'Helo',
      email: 'helo@gmail.com',
      senha: '123',
      cpf: '11346412901',
      cidade: 'Paranaguá',
      estado: 'PR',
      rua: 'Rua H',
      numero_casa: '382',
    })    
  }
}