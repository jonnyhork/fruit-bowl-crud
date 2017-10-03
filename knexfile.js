'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/fuitbowl'
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/fuitbowl-test'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
}
