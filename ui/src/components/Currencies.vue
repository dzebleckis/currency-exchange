<template>
  <div class="md-layout-item md-size-25">
    <md-field>
      <label :for="id">{{ label }}</label>
      <md-select :disabled="disabled" v-on:md-selected="onSelected" :id="id">
        <md-option v-for="currency in currencies" :key="currency" :value="currency">{{currency}}</md-option>
      </md-select>
    </md-field>
  </div>
</template>

<script>
export default {
  name: "Currencies",
  props: {
    id: String,
    label: String,
    currencies: Array,
    disabled: Boolean,
  },
  methods: {
    onSelected(value) {
      this.$emit("input", value);
    }
  }
};
</script>

<style scoped>
</style>
