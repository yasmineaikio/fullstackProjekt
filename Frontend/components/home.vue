<template>
<div>
  <div id="title">
    <h1>Under Construction</h1>
    <font-awesome-icon icon="cog" id="cog" />
  </div>
</div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped>
  #title {
    position: relative;
    text-align: center;
  }
  #title h1 {
  color: black;
  font-family: cursive;
  font-size: 4em;
  font-weight: 600;
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.7);
}
#cog {
  font-size: 4.5em;
  color: black;
  animation: spin 5s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
