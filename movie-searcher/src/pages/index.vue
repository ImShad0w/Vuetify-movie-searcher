<template>
  <v-container>
    <Searchbar @movieData="handleMovieData" />
    <MoviePage v-if="movieId != null" :movieId="movieId" />
    <MovieList v-else :movies="movies" @movieId="handleMovieId" />
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import MovieList from '@/components/MovieList.vue';
import MoviePage from '@/components/MoviePage.vue';
import Searchbar from '@/components/Searchbar.vue';

const movies = ref([])
const movieId = ref(null)

function handleMovieData(data) {
  movies.value = data
}

function handleMovieId(id) {
  movieId.value = id
}
</script>
