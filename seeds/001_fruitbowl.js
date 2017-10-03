exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('fruitbowl').del()
    .then(function() {
      // Inserts seed entries
      return knex('fruitbowl').insert([{
        id: 1,
        name: 'banana',
        color: "yellow",
        is_fruit: true
      }, {
        id: 2,
        name: 'apple',
        color: "red",
        is_fruit: true
      }, {
        id: 3,
        name: 'cucumber',
        color: "green",
        is_fruit: false
      }])
    }).then(() => {
      return knex.raw("SELECT setval('fruitbowl_id_seq', (SELECT MAX(id) FROM fruitbowl));")
    })
}
