import { BaseSchema } from '@adonisjs/lucid/schema'

export default class User extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('email').notNullable().unique()
      table.string('senha').notNullable()
      table.enum('perfil', ['cliente', 'gerente']).notNullable()
      table.integer('cliente_id').unsigned().nullable().references('id').inTable('clientes').onDelete('SET NULL')
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}