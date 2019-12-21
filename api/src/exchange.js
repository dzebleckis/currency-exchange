const axios = require('axios').default

module.exports = (baseUrl) => {
  return {
    rates: async (base) => {
      const response = await axios.get(baseUrl, { params: { base } })
      return response.data.rates
    }
  }
}
