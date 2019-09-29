<template>
  <div>
    <div v-if="movies.length > 0" class="list-group" id="movieList">
      <div :key="movie.id" v-for="movie in movies" class="card" style="width: 18rem;">
        <img class="card-img-top" :src="link+movie.poster_path" :alt="movie.title">
        <div class="card-body">
          <h5 class="card-title">
            {{movie.title}}
            <span
              class="badge badge-secondary"
              :class="movie.vote_average > 8 ? 'list-group-item-success' : 'list-group-item-danger'"
            >{{movie.vote_average}}</span>
          </h5>
          <h6>Released Date: {{movie.release_date}}</h6>
          <p class="card-text">{{movie.overview}}</p>

          <!-- Function to be added to Add Movie to State -->
          <a
            v-if="favoriteMovies.find(favoriteMovie => favoriteMovie.id === movie.id)"
            @click="deleteMovie(movie.id)"
            class="btn btn-danger"
          >Remove From My List</a>
          
          <a v-else @click="addMovie(movie)" class="btn btn-primary">Add To My List</a>
        </div>
      </div>
    </div>
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
      link: "https://image.tmdb.org/t/p/w300/"
    };
  },
  computed: {
    favoriteMovies() {
      return this.$store.getters.favoriteMovies;
    }
  },
  methods: {
    addMovie(movieID) {
      this.$store.commit("addMovie", movieID);
    },
    deleteMovie(movieID) {
      this.$store.commit("deleteMovie", movieID);
    },
    formatDate(date) {
      let monthNames = ["January"];
      let formattedDate = new Date(date);

      return `${formattedDate.getDate()} ${formattedDate.getMonth()}`;
    }
  }
};
</script>

<style lang="scss" scoped>
/* h3 {
  grid-column: 1/-1;
}
#movieList {
  display: grid;
  grid-gap: 0.25rem;

  @media screen and (min-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: 1000px) {
    grid-template-columns: repeat(3, 1fr);
  }
} */
</style>

