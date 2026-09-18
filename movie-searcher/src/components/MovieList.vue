<template>
  <v-container>
    <v-row>
      <template v-if="!hasSearched">
        <v-col cols="12">
          <v-alert type="info">Type a movie name!</v-alert>
        </v-col>
      </template>

      <template v-else-if="loading">
        <v-col cols="12" class="text-center py-16">
          <v-progress-circular indeterminate color="primary" size="48"></v-progress-circular>
        </v-col>
      </template>

      <template v-else-if="!movies.length">
        <v-col cols="12">
          <v-alert type="warning">No movies found — try another search.</v-alert>
        </v-col>
      </template>

      <v-col v-for="movie in movies" :key="movie.imdbID" cols="12" sm="6" md="6" lg="4">
        <v-card class=" w-auto" :title="movie.Title" :subtitle="movie.Type">
          <v-img :src="movie.Poster" height="200"></v-img>
          <v-card-actions>
            <v-btn @click="getId(movie.imdbID)" block border>
              More
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
defineProps({
  movies: Array,
  loading: Boolean,
  hasSearched: Boolean,
})
const emit = defineEmits(["movieId"])

function getId(id) {
  emit("movieId", id)
}

</script>
