const express = require('express')
const router = express.Router()
const knex = require('../knex')
const boom = require('boom')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', (_req, res, next) => {
  knex('fruitbowl')
    .then((fruits) => {
      res.send(fruits)
    }).catch((err) => {
      next(err)
    })
})

router.get('/:id', (req, res, next) => {
  const id = Number(req.params.id)

  if (Number.isNaN(id)) {
    return next(boom.create(400, 'id must be a number'))
  }

  knex('fruitbowl')
    .where('id', id)
    .first()
    .then((row) => {
      if (!row) {
        return next(boom.create(404, 'Fruit not found'))
      }

      return knex('fruitbowl')
        .where('id', id)
        .first()
        .then((fruit) => {
          res.send(fruit)
        })
    })
    .catch((err) => {
      next(err)
    })
})

router.post('/', (req, res, next) => {

  const {
    name,
    color,
    is_fruit
  } = req.body

  if (!name || !name.trim()) {
    return next(boom.create(404, 'What is the name?'))
  }
  if (!color || !color.trim()) {
    return next(boom.create(404, 'What is the color?'))
  }
  if (!is_fruit || !is_fruit.trim()) {
    return next(boom.create(404, 'Is it a fruit?'))
  }

  let insertFruit = {
    name,
    color,
    is_fruit
  }

  knex('fruitbowl')
    .insert(insertFruit)
    .then(() => {
      res.send(insertFruit)
    })
    .catch((err) => {
      next(err)
    })
})

router.patch('/:id', (req, res, next) => {
  const id = Number(req.params.id)

  if (Number.isNaN(id)) {
    return next(boom.create(400, 'Id must be a number'))
  }

  knex('fruitbowl')
    .where('id', id)
    .first()
    .then((row) => {
      if (!row) {
        return next(boom.create(404, 'Fruit not found'))
      }

      const {
        name,
        color,
        is_fruit
      } = req.body

      let updatefruit = {}

      if (name) {
        updatefruit.name = name
      }
      if (color) {
        updatefruit.color = color
      }
      if (is_fruit) {
        updatefruit.is_fruit = is_fruit
      }

      return knex('fruitbowl')
        .update(updatefruit, '*')
        .where('id', id)
    })
    .then((row) => {
      res.send(row[0])
    })
    .catch((err) => {
      next(err)
    })
})

router.delete('/:id', (req, res, next) => {
  const id = Number(req.params.id)

  if (Number.isNaN(id)) {
    return next(boom.create(400), 'id must be a number')
  }

  let fruit

  knex('fruitbowl')
    .where('id', id)
    .first()
    .then((row) => {
      if (!row) {
        return next(boom.create(404), 'Fruit not found!')
      }

      fruit = row

      return knex('fruitbowl')
        .del()
        .where('id', id)
    })
    .then(() => {
      res.send(fruit)
    })
    .catch((err) => {
      next(err)
    })
})

module.exports = router
