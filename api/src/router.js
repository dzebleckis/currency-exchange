const validators = require('./validators')
const config = require('./config')

module.exports = function (service) {
  const router = require('express').Router()

  router.get('/quote', (req, res, next) => {
    const result = validators.validateQuote(config.currencies, req.query)
    if (result.valid) {
      let { from_currency_code: fromCurrency, to_currency_code: toCurrency, amount } = req.query

      fromCurrency = fromCurrency.toUpperCase()
      toCurrency = toCurrency.toUpperCase()
      amount = parseInt(amount)

      service
        .calculateQuote(fromCurrency, toCurrency, amount)
        .then(result => res.json(result))
        .catch(error => next(error))
    } else {
      res.status(400).json(result.errors)
    }
  })

  return router
}
