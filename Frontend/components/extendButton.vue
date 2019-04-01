<template lang="html">
  <div>
    <form>
      <button v-on:click="extendLoan" type="submit">Låna om</button>
    </form>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
  button {
    font-size:15px;
    background-color: #F3C954;
    border: 2px solid transparent;
    padding: 10px 40px;
    border-radius: 2px;
    font-family: 'Work Sans', sans-serif;
  }
  button:hover {
    border: 2px solid grey;
  }
</style>
