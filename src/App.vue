<template>
  <div id="app">
    <navbar></navbar>
    <div class="body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from './components/shared/Navbar'
export default {
  name: 'app',
  components: {
    Navbar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.body {
  margin-top: 50px;
}
</style>
