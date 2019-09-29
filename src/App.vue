<template>
  <div id="app">
    <!-- <div class="alert alert-primary" role="alert">
      A simple primary alert with
      <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
    </div>-->
    <Form/>
    <Search/>
    <Favorites/>
  </div>
</template>

<script>
import Form from "./components/Form";
import Favorites from "./components/Favorites";
import Search from "./components/Search";

export default {
  name: "App",
  components: {
    Form,
    Favorites,
    Search
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
