<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <form>
      <label> From
        <CurrencyList :currencies=currencies />
      </label>
    </form>

  </div>
</template>

<script>

import CurrencyList from './components/CurrencyList.vue'

export default {
  name: 'app',
  components: {
    CurrencyList
  },
  data: function () {
    return { currencies: ["EUR", "USD"] }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>
