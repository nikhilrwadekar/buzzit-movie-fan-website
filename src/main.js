// Bootstrap Templates from Docs

import Vue from "vue";
import App from "./App.vue";
import Vuex from "vuex";

Vue.config.productionTip = false;

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    favoriteMovies: [],
    fullName: null,
    shortBio: null
  },
  getters: {
    favoriteMovies(state) {
      return state.favoriteMovies;
    },
    fullName(state) {
      return state.fullName;
    },
    shortBio(state) {
      return state.shortBio;
    }
  },
  mutations: {
    addMovie(state, movie) {
      state.favoriteMovies.push(movie);
    },
    deleteMovie(state, movieID) {
      let movieFoundAt = state.favoriteMovies.findIndex(
        movie => movieID === movie.id
      );
      state.favoriteMovies.splice(movieFoundAt, 1);
    },
    setName(state, fullName) {
      state.fullName = fullName;
    },
    setShortBio(state, shortBio) {
      state.shortBio = shortBio;
    }
  }
});

new Vue({
  el: "#app",
  store,
  render: h => h(App)
});
