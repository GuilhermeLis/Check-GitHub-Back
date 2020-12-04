import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Cursors extends BaseSchema {
  protected tableName = 'cursors'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.text('cursor')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
