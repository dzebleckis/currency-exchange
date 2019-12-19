const validators = require('./validators')
const config = require('./config')

module.exports = function (service) {

  const router = require('express').Router()

  router.get('/quote', (req, res, next) => {
    const result = validators.validateQuote(config.currencies, req.query)
    if (result.valid) {
      let { from_currency_code, to_currency_code, amount } = req.query

      from_currency_code = from_currency_code.toUpperCase()
      to_currency_code = to_currency_code.toUpperCase()
      amount = parseInt(amount)

      service
        .calculateQuote(from_currency_code, to_currency_code, amount)
        .then(result => res.json(result))
        .catch(error => next(error))
    } else {
      res.status(400).json(result.errors)
    }
  })

  return router
}
