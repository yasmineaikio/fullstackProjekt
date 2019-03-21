<template>
<div>
  <div id="title">
    <h1>Under Construction</h1>
    <font-awesome-icon icon="cog" id="cog" /><font-awesome-icon icon="cog" id="cog2" /><br>
    <font-awesome-icon icon="cog" id="cog3" />
  </div>
</div>
</template>

<script>
  export default {

  }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Source+Serif+Pro|Work+Sans');
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
  font-size: 80px;
  color: #666;
  animation: spin 5s linear infinite;
}
#cog2 {
  font-size: 120px;
  color: #666;
  animation: spin 5s linear infinite;
}
#cog3 {
  font-size: 50px;
  color: #666;
  animation: spinBack 5s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@keyframes spinBack {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(-360deg); }
}
</style>
