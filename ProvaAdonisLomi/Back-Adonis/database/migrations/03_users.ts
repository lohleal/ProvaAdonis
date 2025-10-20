import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('nome_completo').nullable()
      table.string('email').notNullable().unique()
      table.string('senha').notNullable()
      table.integer('papel_id').unsigned().nullable().references('id').inTable('papels').onDelete('SET NULL')
      table.integer('cliente_id').unsigned().nullable().references('id').inTable('clientes').onDelete('CASCADE')

      table.timestamp('created_at', { useTz: true }).nullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
