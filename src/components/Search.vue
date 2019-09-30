<template>
  <div v-if="$store.getters.fullName" class="jumbotron mx-auto col-sm-12 col-md-8">
    <!-- Find and Add Favorite Movies -->
    <h2>{{$store.getters.fullName}}, let's find new Movies to favorite!</h2>
    <h4>
      Currently you have {{$store.getters.favoriteMovies.length}}
      <a href="#favorites">favorite</a> movie(s).
    </h4>

    <!-- Search Input -->
    <div class="form-group">
      <label for="favoriteMovies">Search Movies</label>
      <input
        class="form-control mr-sm-2"
        type="search"
        placeholder="Search for movies..."
        aria-label="Search"
        v-on:keyup.enter="findMovies"
        v-model="searchQuery"
      >

      <!-- Search Button -->
      <button
        class="btn btn-primary my-2 my-sm-0"
        type="submit"
        v-on:click.prevent="findMovies"
      >Search</button>

      <!-- Conditional Clear Search Button -->
      <button
        v-if="movies.length !== 0"
        class="btn btn-secondary my-2 my-sm-0"
        type="submit"
        v-on:click.prevent="clearSearch"
      >Clear Search</button>
    </div>

    <!-- Movie Component rendering searched Movies -->
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
      // Axios to fetch data from API
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

    // Clear Search Results
    clearSearch() {
      this.movies = [];
    }
  }
};
</script>

<style>
</style>
