module.exports = (exchange, cache) => {
  function convert (toCurrency, rates, amount) {
    const exchangeRate = rates[toCurrency].toFixed(3)
    const result = Math.floor(amount * exchangeRate)

    return {
      exchange_rate: exchangeRate,
      currency_code: toCurrency,
      amount: result
    }
  }

  return {
    calculateQuote: async (fromCurrency, toCurrency, amount) => {
      let data = cache.get(fromCurrency)

      if (!data) {
        console.log('no data, fetching')
        data = await exchange.rates(fromCurrency)
        cache.set(fromCurrency, data)
      }

      return convert(toCurrency, data, amount)
    }
  }
}
