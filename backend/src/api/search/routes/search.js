
'use strict'

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/search',
      handler: 'search.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
}