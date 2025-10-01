import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Cliente extends BaseSchema {
  protected tableName = 'clientes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('nome_completo').notNullable()
      table.string('email').notNullable().unique()
      table.string('senha').notNullable()
      table.string('cpf').notNullable().unique()
      table.string('cidade').notNullable()
      table.string('estado').notNullable()
      table.string('rua').notNullable()
      table.string('numero_casa').notNullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}