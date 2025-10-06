import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    // Criar gerente
    await User.create({
      nome_completo: 'Gerente Principal',
      email: 'gerente@teste.com',
      senha: '123456',
      papel_id: 1, 
    })

    // Criar clientes (usuários)
    await User.create({
      nome_completo: 'Cliente 1',
      email: 'cliente1@teste.com',
      senha: '123456',
      papel_id: 2, 
    })

    await User.create({
      nome_completo: 'Cliente 2', 
      email: 'cliente2@teste.com',
      senha: '123456',
      papel_id: 2, 
    })
  }
}