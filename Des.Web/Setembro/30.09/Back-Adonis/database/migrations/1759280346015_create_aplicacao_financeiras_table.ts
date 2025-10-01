import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AplicacoesFinanceiras extends BaseSchema {
  protected tableName = 'aplicacoes_financeiras'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.enum('tipo', ['poupanca', 'titulos_governo', 'acoes']).notNullable()
      table.decimal('valor', 12, 2).notNullable()
      table
        .integer('conta_corrente_id')
        .unsigned()
        .references('id')
        .inTable('contas_correntes')
        .onDelete('CASCADE')
        .notNullable()
      table.enum('status', ['ativa', 'resgatada']).defaultTo('ativa')
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}