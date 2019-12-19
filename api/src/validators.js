function validCurrency (currency, validValues) {
  return (typeof currency) === 'string' && validValues.includes(currency.toUpperCase())
}

module.exports.validateQuote = (validCurrencies, data) => {
  const errors = {}

  validCurrency(data.from_currency_code, validCurrencies)

  if (!validCurrency(data.from_currency_code, validCurrencies)) {
    errors.from_currency_code = `Value should be one of [${validCurrencies.join(', ')}]`
  }

  if (!validCurrency(data.to_currency_code, validCurrencies)) {
    errors.to_currency_code = `Value should be one of [${validCurrencies.join(', ')}]`
  }

  const amount = parseInt(data.amount)

  if (!Number.isInteger(amount) || amount < 1) {
    errors.amount = 'Value should be positive number'
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  }
}
