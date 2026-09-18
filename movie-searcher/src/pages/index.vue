<template>
  <v-container>
    <Searchbar @movieData="handleMovieData" />
    <MoviePage v-if="movieId != null" :movieInfo="movieInfo" @resetId="resetId" />
    <MovieList v-else :movies="movies" @movieId="handleMovieId" />
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import MovieList from '@/components/MovieList.vue';
import MoviePage from '@/components/MoviePage.vue';
import Searchbar from '@/components/Searchbar.vue';
import { useApi } from "@/composables/communicationManager"

const movies = ref([])
const movieId = ref(null)
const { movieInfo, getMovieInfo } = useApi()

function handleMovieData(data) {
  movies.value = data
}

function handleMovieId(id) {
  movieId.value = id
  getMovieInfo(movieId.value)
}

function resetId() {
  movieId.value = null
}
</script>
