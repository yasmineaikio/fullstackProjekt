<template>
  <div>
      <form>
          <h4>Skapa konto</h4>
          <input type="text" placeholder="Namn" v-bind:value="name"><br>
          <input type="password" placeholder="Lösenord" v-bind:value="password"><br>
          <input type="submit" value="skapa" v-on:click="addUser"><br>
      </form>
  </div>
</template>
<script>
export default {
    data() {
      return {
          userLog: {
              name: 'alex',
              password: 'test',
              id: null,
              type: 'vistitor',
          }
      }
    },
    methods: {
        addUser() { 
            
            fetch('http://localhost:3000/users', {
                method: 'POST',
                body: JSON.stringify({name: "alexTest", password:"sec", type:"user"}),
                mode: 'no-cors',
                headers: {'Content-type': 'application/json'},
            }).then(function(response){
                return response.json()
            })
            .then(function(result){
                console.log(result)
            })
        }
    }
}
</script>
<style scoped>
 h4 {
     color:darkblue;
 }
 form {
     border: 2px solid navy;
     width: 230px;
     text-align: center;
     margin: 2em auto;
     position: absolute;
     top: 1px;
     right: 11%;
 }
</style>