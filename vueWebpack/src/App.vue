<template>
  <div id="app">
    <div>
      这是一个app.vue
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app{
  border:1px solid black;
  width: 80%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: 0 auto;
}
a{
  color: #2c3e50;
  text-decoration:none; 
}
</style>
