<template>
  <div id="favorites" v-if="favoriteMovies.length" class="jumbotron mx-auto col-sm-12 col-md-8">
    <h1>Your Favorites</h1>

    <!-- Movie component rendering favorite movies -->
    <Movies :movies="favoriteMovies"/>
  </div>
</template>

<script>
import Movies from "./Movies";
export default {
  name: "Favorites",
  components: {
    Movies
  },
  computed: {
    favoriteMovies() {
      return this.$store.getters.favoriteMovies;
    }
  }
};
</script>

<style>
</style>
