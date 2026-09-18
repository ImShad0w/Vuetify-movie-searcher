<template>
  <v-container>
    <Searchbar @searching="handleSearching" @movieData="handleMovieData" />
    <MovieList :movies="movies" :loading="loading" :has-searched="hasSearched" @movieId="handleMovieId" />
    <MoviePage :movieOpen="movieOpen" :movieInfo="movieInfo" @movieClose="handleMovieClose" />
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import MovieList from '@/components/MovieList.vue';
import MoviePage from '@/components/MoviePage.vue';
import Searchbar from '@/components/Searchbar.vue';
import { useApi } from "@/composables/communicationManager"

const movies = ref([])
const movieOpen = ref(false)
const loading = ref(false)
const hasSearched = ref(false)
const { movieInfo, getMovieInfo } = useApi()

function handleSearching() {
  loading.value = true
  hasSearched.value = true
}

function handleMovieData(data) {
  movies.value = data
  loading.value = false
}

function handleMovieId(id) {
  movieOpen.value = true
  getMovieInfo(id)
}

function handleMovieClose() {
  movieOpen.value = false
}
</script>
