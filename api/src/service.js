function toJson (exchangeRate, toCurrency, amount) {
  return {
    exchange_rate: exchangeRate,
    currency_code: toCurrency,
    amount
  }
}

function convert (toCurrency, rates, amount) {
  const exchangeRate = rates[toCurrency].toFixed(3)
  const result = Math.floor(amount * exchangeRate)

  return toJson(exchangeRate, toCurrency, result)
}

module.exports = (exchange, cache) => {
  return {
    calculateQuote: async (fromCurrency, toCurrency, amount) => {
      if (fromCurrency === toCurrency) {
        return toJson(1, toCurrency, amount)
      }

      let data = cache.get(fromCurrency)

      if (!data) {
        data = await exchange.rates(fromCurrency)
        cache.set(fromCurrency, data)
      }

      return convert(toCurrency, data, amount)
    }
  }
}
