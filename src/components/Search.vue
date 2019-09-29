<template>
  <div v-if="$store.getters.fullName" class="jumbotron mx-auto col-md-auto col-sm-9 col-md-6">
    <!-- Find and Add Favorite Movies -->
    <h2>{{$store.getters.fullName}}, let's find new Movies to favorite!</h2>

    <!-- Search Input -->
    <div class="form-group">
      <label for="favoriteMovies">Search Movies</label>
      <input
        class="form-control mr-sm-2"
        type="search"
        placeholder="Search for movies..."
        aria-label="Search"
        v-model="searchQuery"
      >
      <button
        class="btn btn-primary my-2 my-sm-0"
        type="submit"
        v-on:click.prevent="findMovies"
      >Search</button>
      
      <button
        class="btn btn-secondary my-2 my-sm-0"
        type="submit"
        v-on:click.prevent="clearSearch"
      >Clear Search</button>
    </div>

    <!-- Movie Component -->
    <Movies :v-if="searched" :movies="movies"/>
  </div>
</template>

<script>
import axios from "axios";
import Movies from "./Movies";

export default {
  data() {
    return {
      favoriteMovies: [],
      searched: false,
      movies: [],
      searchQuery: ""
    };
  },
  components: {
    Movies
  },
  methods: {
    findMovies() {
      axios
        .get("https://api.themoviedb.org/3/search/movie", {
          params: {
            api_key: "ea9385095138c0c18e3aca7590507b54",
            language: "en-US",
            query: this.searchQuery,
            include_adult: false
          }
        })
        .then(response => {
          this.searched = true;
          if (response.data.results) {
            this.movies = response.data.results;
          }
        });
    },
    clearSearch() {
      this.movies = [];
    }
  }
};
</script>

<style>
</style>
