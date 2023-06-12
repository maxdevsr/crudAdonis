import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateProdutoTamanho extends BaseSchema {
  protected tableName = 'produto_tamanho'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('produto_id')
        .unsigned()
        .references('id')
        .inTable('produtos')
        .onDelete('CASCADE')
      table
        .integer('tamanho_id')
        .unsigned()
        .references('id')
        .inTable('tamanhos')
        .onDelete('CASCADE')
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
