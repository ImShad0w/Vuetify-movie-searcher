<template>
  <v-container class="mx-auto max-w-6xl py-8">
    <!-- Header: strong contrast against the muted page background + one shared alignment axis -->
    <header class="mb-8 text-center">
      <v-icon class="mb-2" color="primary" icon="mdi-movie-open-star" size="48" />

      <h1 class="text-4xl font-bold tracking-tight text-slate-900">
        Movie <span class="text-primary">Searcher</span>
      </h1>

      <p class="mx-auto mt-3 max-w-xl text-base text-slate-500">
        Search thousands of films by title and open any result to read the full plot, genre and runtime.
      </p>
    </header>

    <Searchbar @searching="handleSearching" @movieData="handleMovieData" />
    <MovieList :movies="movies" :loading="loading" :has-searched="hasSearched" @movieId="handleMovieId" />
    <MoviePage :movieOpen="movieOpen" :movieInfo="movieInfo" @movieClose="handleMovieClose" />
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import MovieList from '@/components/MovieList.vue'
import MoviePage from '@/components/MoviePage.vue'
import Searchbar from '@/components/Searchbar.vue'
import { useApi } from '@/composables/communicationManager'

const movies = ref([])
const movieOpen = ref(false)
const loading = ref(false)
const hasSearched = ref(false)
const { movieInfo, getMovieInfo } = useApi()

function handleSearching () {
  loading.value = true
  hasSearched.value = true
}

function handleMovieData (data) {
  movies.value = data
  loading.value = false
}

function handleMovieId (id) {
  movieOpen.value = true
  getMovieInfo(id)
}

function handleMovieClose () {
  movieOpen.value = false
}
</script>
