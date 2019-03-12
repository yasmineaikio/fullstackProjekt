<template>
<div>
    <counter-button />
    <counter-button />
    <counter-button />
  </div>
</template>

<script>
    import CounterButton from './CounterButton.vue'

  export default {
    components: {
      'counter-button': CounterButton
    }
  }
</script>

<style>
  
</style>