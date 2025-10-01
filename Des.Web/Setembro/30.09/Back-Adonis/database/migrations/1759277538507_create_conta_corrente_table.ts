import { BaseSchema } from '@adonisjs/lucid/schema'

export default class ContaCorrente extends BaseSchema {
  protected tableName = 'contas_correntes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('numero_conta').notNullable().unique()
      table.string('numero_agencia').notNullable()
      table.decimal('saldo', 14, 2).defaultTo(0)
      table.integer('cliente_id').unsigned().references('id').inTable('clientes').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}