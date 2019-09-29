<template>
  <div
    id="favorites"
    v-if="favoriteMovies.length"
    class="jumbotron mx-auto col-md-auto col-sm-9 col-md-6"
  >
    <!-- {{this.$store.favoriteMovies}} -->
    <h1>Your Favorites</h1>

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
  },

  watch: {
    // favoriteMovies
  }
};
</script>

<style>
</style>
