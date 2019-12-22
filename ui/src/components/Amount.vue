<template>
  <div class="md-layout-item md-size-25">
    <imask-input
      :mask="Number"
      radix="."
      :unmask="true"
      placeholder="Amount"
      @input="onInput"
      :max="100000"
      :disabled="disabled"
    />
  </div>
</template>

<script>
import {IMaskComponent} from 'vue-imask';

export default {
  name: "Amount",
  props: {
    disabled: Boolean,
  },
  components: {
      'imask-input': IMaskComponent
  },
  methods: {
    onInput(value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style scoped>
input {
  border: none;
  background: inherit;
  height: 32px;
  font-size: 16px;
  line-height: 32px;
  margin-top: 20px;
  border-bottom: 1px solid rgba(0,0,0,0.42);
  width: 100%;
}
</style>
