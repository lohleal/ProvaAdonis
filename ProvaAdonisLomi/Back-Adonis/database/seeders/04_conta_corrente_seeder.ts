import { BaseSeeder } from '@adonisjs/lucid/seeders'
import ContaCorrente from '#models/conta_corrente'
import Cliente from '#models/cliente'

export default class ContaCorrenteSeeder extends BaseSeeder {
  public async run() {
    // Busca clientes já cadastrados
    const clientes = await Cliente.all()

    
  }
}