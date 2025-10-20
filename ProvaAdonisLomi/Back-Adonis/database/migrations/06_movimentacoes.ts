import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'movimentacoes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.enum('tipo', ['transferencia']).notNullable().defaultTo('transferencia')
      table.decimal('valor', 12, 2).notNullable()
      table.integer('conta_origem_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('contas_correntes')
        .onDelete('CASCADE')
      table.integer('conta_destino_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('contas_correntes')
        .onDelete('CASCADE')
      table.string('cpf_destinatario', 14).notNullable()
      table.timestamp('created_at', { useTz: true }).nullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}