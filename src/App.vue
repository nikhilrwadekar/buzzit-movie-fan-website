<template>
  <!--
    
    HTML Boilerplates: Courtesy of Bootstrap Docs
    Components: Form, Search, Movies, Favorites
    Dependency for API Fetch: Axios
  
  -->
  <div id="app">
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
