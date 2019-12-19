const axios = require('axios').default;

module.exports = (baseUrl) => {
  return {
    rates: (base) => {
      return axios.get(baseUrl, {
        params: {
          base
        }
      })
      .then(response => response.data)
    }
  }
}
