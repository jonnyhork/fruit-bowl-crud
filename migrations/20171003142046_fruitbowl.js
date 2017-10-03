exports.up = function(knex, Promise) {
  return knex.schema.createTable('fruitbowl', (table) => {
    table.increments()
    table.string('name').notNullable().defaultTo('')
    table.string('color').notNullable().defaultTo('')
    table.boolean('is_fruit').notNullable().defaultTo('')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('fruitbowl')
}
