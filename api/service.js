module.exports = (exchange, cache) => {

  function convert(toCurrency, rates, amount) {
    let exchangeRate = rates[toCurrency].toFixed(3)
    let result = Math.floor(amount * exchangeRate)

    return {
      exchange_rate: exchangeRate,
      currency_code: toCurrency,
      amount: result,
    }
  }

  return {
    calculateQuote: (fromCurrency, toCurrency, amount) => {

      let data = cache.get(fromCurrency)

      if (data) {
        return new Promise((resolve) => resolve(convert(toCurrency, data, amount)))
      }

      return exchange
        .rates(fromCurrency)
        .then(data => {
          cache.set(fromCurrency, data.rates)
          return convert(toCurrency, data.rates, amount)
        })
    }
  }
}
