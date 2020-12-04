import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Developers extends BaseSchema {
  protected tableName = 'developers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.text('oid')
      table.text('message_headline')
      table.string('author')
      table.timestamp('committed_date')
      table.integer('additions')
      table.integer('removals')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
