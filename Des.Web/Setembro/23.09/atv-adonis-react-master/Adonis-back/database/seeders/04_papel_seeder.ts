import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Papel from '#models/papel'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Papel.createMany([
      {
        nome: 'Coordenador',
      },
      {
        nome: 'Professor',
      },
    ])
  }
}
