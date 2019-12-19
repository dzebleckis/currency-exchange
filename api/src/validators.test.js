const validateQuote = require('./validators').validateQuote

const validCurrencies = ['EUR', 'USD']

describe('Test quote validator', () => {
  test('only alloved currencies', () => {
    const data = {}

    const result = validateQuote(validCurrencies, data)
    expect(result.valid).toBe(false)
    expect(result.errors).toEqual({
      from_currency_code: 'Value should be one of [EUR, USD]',
      amount: 'Value should be positive number',
      to_currency_code: 'Value should be one of [EUR, USD]'
    })
  })

  test('amount not negative', () => {
    const data = {
      from_currency_code: 'eur',
      amount: 0,
      to_currency_code: 'usd'
    }

    let result = validateQuote(validCurrencies, data)
    expect(result.valid).toBe(false)
    expect(result.errors).toEqual({ amount: 'Value should be positive number' })

    result = validateQuote(validCurrencies, { ...data, ...{ amount: 'adfads' } })
    expect(result.valid).toBe(false)
    expect(result.errors).toEqual({ amount: 'Value should be positive number' })

    result = validateQuote(validCurrencies, { ...data, ...{ amount: -1 } })
    expect(result.valid).toBe(false)
    expect(result.errors).toEqual({ amount: 'Value should be positive number' })

    result = validateQuote(validCurrencies, { ...data, ...{ amount: 1 } })
    expect(result.valid).toBe(true)
    expect(result.errors).toEqual({})

    result = validateQuote(validCurrencies, { ...data, ...{ amount: '1' } })
    expect(result.valid).toBe(true)
    expect(result.errors).toEqual({})
  })
})
