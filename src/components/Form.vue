<template>
  <div>
    <h1>Hello, {{fullName ? `${fullName}` : "Movie Fan"}}</h1>
    <form>
      <!-- First Name -->
      <div class="form-group">
        <label for="firstName">First Name</label>
        <input
          v-model="firstName"
          type="text"
          class="form-control"
          id="firstName"
          placeholder="First Name"
        >
      </div>

      <!-- Last Name -->
      <div v-if="firstName" class="form-group">
        <label for="lastName">Last Name</label>
        <input
          v-model="lastName"
          type="text"
          class="form-control"
          id="lastName"
          placeholder="Last Name"
        >
      </div>

      <!-- Short Bio -->
      <div v-if="fullName" class="form-group">
        <label for="shortBio">Short Bio ({{bioLength}}/100)</label>
        <textarea
          v-model="shortBio"
          class="form-control"
          id="shortBio"
          rows="3"
          :maxlength="shortBioLimit"
        ></textarea>
      </div>

      <!-- Search Input -->
      <div v-if="shortBio" class="form-group">
        <label for="favoriteMovies">Favorite Movies</label>
        <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search for movies..."
          aria-label="Search"
          v-model="searchQuery"
        >
        <button
          class="btn btn-outline-success my-2 my-sm-0"
          type="submit"
          v-on:click.prevent="findMovies"
        >Search</button>
      </div>

      <!-- Movie Component -->
      <Movies v-if="searched" :movies="movies"/>
    </form>
  </div>
</template>


<script>
import axios from "axios";
import Movies from "./Movies";

export default {
  name: "Form",
  components: {
    Movies
  },
  data: function() {
    return {
      firstName: "Nikhil",
      lastName: "Wadekar",
      shortBio: "I'm Nikhil Wadekar, here are my movies!",
      shortBioLimit: 100,
      favoriteMovies: [],
      searched: false,
      movies: [
        // {
        //   popularity: 32.153,
        //   vote_count: 17125,
        //   video: false,
        //   poster_path: "/adw6Lq9FiC9zjYEpOqfq03ituwp.jpg",
        //   id: 550,
        //   adult: false,
        //   backdrop_path: "/mMZRKb3NVo5ZeSPEIaNW9buLWQ0.jpg",
        //   original_language: "en",
        //   original_title: "Fight Club",
        //   genre_ids: [18],
        //   title: "Fight Club",
        //   vote_average: 8.4,
        //   overview:
        //     'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground "fight clubs" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.',
        //   release_date: "1999-10-15"
        // },
        // {
        //   popularity: 6.273,
        //   id: 440777,
        //   video: false,
        //   vote_count: 20,
        //   vote_average: 5.3,
        //   title: "Female Fight Club",
        //   release_date: "2017-08-08",
        //   original_language: "en",
        //   original_title: "Female Fight Club",
        //   genre_ids: [18, 28],
        //   backdrop_path: "/rYyIqfx6BNpb7s0Wy5OqddCsKEQ.jpg",
        //   adult: false,
        //   overview:
        //     "A former fighter reluctantly returns to the life she abandoned in order to help her sister survive the sadistic world of illegal fighting and the maniac who runs it.",
        //   poster_path: "/iI9c8XNdPuwB4RYbHMd62QNhoRK.jpg"
        // },
        // {
        //   popularity: 2.801,
        //   id: 347807,
        //   video: false,
        //   vote_count: 8,
        //   vote_average: 3.5,
        //   title: "Fight Club: Members Only",
        //   release_date: "2006-02-17",
        //   original_language: "hi",
        //   original_title: "Fight Club: Members Only",
        //   genre_ids: [28],
        //   backdrop_path: null,
        //   adult: false,
        //   overview:
        //     "Four friends head off to Bombay and get involved in the mother and father of all gang wars.",
        //   poster_path: "/aXFmWfWYCCxQTkCn7K86RvDiMHZ.jpg"
        // }
      ],
      searchQuery: null
    };
  },
  computed: {
    fullName: function() {
      if (this.firstName && this.lastName)
        return `${this.firstName} ${this.lastName}`;
    },
    bioLength: function() {
      if (this.shortBio) return this.shortBio.length;
      else return 0;
    }
    // favoriteMovies:
  },
  methods: {
    findMovies() {
      this.searched = true;
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
          if (response.data.results) {
            this.movies = response.data.results;
          }
        });
    },
    addMovie(movieID) {}
  }
};
</script>

<style>
</style>
