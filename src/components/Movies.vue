<template>
  <div>
    <!-- If movies are found, list Movies -->
    <div v-if="movies.length > 0" class="container-fluid row mx-auto" id="movieList">
      <div
        :key="movie.id"
        v-for="movie in movies"
        class="card rounded mb-3 col-sm-12 col-md-6 col-lg-4"
        style="width: 18rem;"
      >
        <!-- Show poster, if no poster is found, show placeholder image -->
        <img
          class="card-img-top"
          :src="movie.poster_path ? link+movie.poster_path : linkNoImage"
          :alt="movie.title"
        >
        <div class="card-body">
          <h4 class="card-title">
            {{movie.title}}
            <span
              class="badge badge-secondary"
              :class="movie.vote_average > 8 ? 'list-group-item-success' : 'list-group-item-danger'"
            >{{movie.vote_average}}</span>
          </h4>
          <h6>
            <strong>Release Date:</strong>
            {{movie.release_date}}
          </h6>
          <p class="card-text">{{movie.overview}}</p>

          <!-- Remove Button if movie is already in favorites -->
          <button
            v-if="favoriteMovies.find(favoriteMovie => favoriteMovie.id === movie.id)"
            @click="deleteMovie(movie.id)"
            class="btn btn-danger"
          >Remove From My List</button>

          <!-- Add Button if movie isn't already in favorites -->
          <button
            v-else-if="favoriteMoviesCount < favoriteMoviesLimit"
            @click="addMovie(movie)"
            class="btn btn-primary"
          >Add To My List</button>
        </div>
      </div>
    </div>

    <!-- Else if no results are fetched after searching -->
    <div v-else-if="searched">
      <h3>Can't find that Movie!</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movies: Array,
    searched: Boolean
  },
  data() {
    return {
      link: "https://image.tmdb.org/t/p/w300/",
      linkNoImage:
        "https://via.placeholder.com/229x343.png?text=No+Poster+For+This+Movie",

      // Favorites Limit
      favoriteMoviesLimit: 15
    };
  },
  computed: {
    favoriteMovies() {
      return this.$store.getters.favoriteMovies;
    },

    // Favorite Movies Counter
    favoriteMoviesCount() {
      return this.$store.getters.favoriteMovies
        ? this.$store.getters.favoriteMovies.length
        : 0;
    }
  },
  methods: {
    // Add Movie to favorites (VueX store)
    addMovie(movieID) {
      this.$store.commit("addMovie", movieID);
    },
    // Remove Movie from favorites (VueX store)
    deleteMovie(movieID) {
      this.$store.commit("deleteMovie", movieID);
    }
  }
};
</script>

<style>
</style>

