<template>
  <div id="app">
    <div class="panel">
      <h3>Simple currency exchange</h3>
      <div class="md-layout md-gutter md-layout-nowrap">
        <Currencies
          :currencies="currencies"
          :disabled="loading"
          id="baseCurrency"
          label="From"
          v-model="baseCurrency"
        />
        <Currencies
          :currencies="currencies"
          :disabled="loading"
          id="quoteCurrency"
          label="To"
          v-model="quoteCurrency"
        />
        <Amount
          :disabled="loading"
          v-model="amount"
        />
        <div class="md-layout-item md-size-25">
          <md-button class="convert md-raised md-primary" :disabled="disabled" @click="convert">Convert</md-button>
        </div>
      </div>
      <div class="loading-overlay" v-if="loading">
        <md-progress-bar md-mode="indeterminate"></md-progress-bar>
      </div>
      <div v-if="failed" class="error">
        Request failed, please try again
      </div>
      <div v-if="responseData">
        <p><strong>Exchange rate</strong> {{responseData.exchange_rate}}</p>
        <p><strong>Amount</strong> {{responseData.amount / 100 }} {{responseData.currency_code}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Currencies from "./components/Currencies.vue";
import Amount from "./components/Amount.vue";

const API_URL = "http://localhost:3000/api/quote" //TODO move to config
const CURRENCIES = ["EUR", "USD", "ILS"] //TODO move to config or fetch from api, depends on requirements

export default {
  name: "app",
  components: {
    Currencies,
    Amount
  },
  data() {
    return {
      currencies: CURRENCIES,
      baseCurrency: undefined,
      quoteCurrency: undefined,
      amount: undefined,
      loading: false,
      failed: false,
      responseData: undefined,
    }
  },
  computed: {
    disabled() {
      return this.loading || !this.isValid;
    },
    isValid() {
      return this.baseCurrency && this.quoteCurrency && this.amount > 0
    }

  },
  methods: {
    async convert() {
      this.loading = true
      this.responseData = undefined
      this.failed = false
      const cents = this.amount * 100
      const url = `${API_URL}?from_currency_code=${this.baseCurrency}&to_currency_code=${this.quoteCurrency}&amount=${cents}`

      try {
        const response = await fetch(url)
        this.loading = false
        if (response.status !== 200) {
          this.failed = true
        }
        this.responseData = await response.json()
      } catch {
        this.loading = false
        this.failed = true
      }
    },
  }
};
</script>

<style>
body {
  margin: 0;
  height: 100%;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
  height: 100%;
  /* background: #f3f3f5; */
}

.panel {
  margin: 0 auto;
  max-width: 550px;
  height: 100%;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 40px 10px 10px 10px;
}

button.convert {
  margin-top: 15px;
}

.error {
  color: #ff1744;
}
</style>
