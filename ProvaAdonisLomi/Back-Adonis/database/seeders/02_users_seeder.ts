import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    // Criar gerente
    await User.create({
      nome_completo: 'Gerente',
      email: 'gerente@gmail.com',
      senha: '123',
      papel_id: 1, 
    })

    await User.create({
      nome_completo: 'Helo', 
      email: 'helo@gmail.com',
      senha: '123',
      papel_id: 2, 
    })
  }
}