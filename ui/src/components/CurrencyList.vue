<template>
  <select >
    <option v-for="currency in currencies" :key="currency" >{{ currency }}</option>
  </select>
</template>

<script>
export default {
  name: 'CurrencyList',
  props: {
    currencies: Array
  }
}
</script>

<style scoped>
</style>
