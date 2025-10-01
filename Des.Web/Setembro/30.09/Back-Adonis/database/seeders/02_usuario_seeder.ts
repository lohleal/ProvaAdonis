import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Usuario from '#models/usuario'
import Cliente from '#models/cliente'

export default class UsuarioSeeder extends BaseSeeder {
  public async run() {
    // Exemplo: criar um gerente
    await Usuario.create({
      email: 'gerente@teste.com',
      senha: '123456',  
      perfil: 'gerente',
      cliente_id: null,
    })

    // Exemplo: criar um cliente vinculado a um cliente já existente
    const cliente = await Cliente.firstOrFail()  // pega um cliente já cadastrado

    await Usuario.create({
      email: 'cliente1@teste.com',
      senha: '123456', 
      perfil: 'cliente',
      cliente_id: cliente.id,
    })

    await Usuario.create({
      email: 'cliente2@teste.com',
      senha: '123456', 
      perfil: 'cliente',
      cliente_id: cliente.id,
    })
  }
}
