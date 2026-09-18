<template>
  <v-container>
    <v-row>
      <v-col v-if="!movies.length" cols="12">
        <v-alert type="info">No movies found — try another search.</v-alert>
      </v-col>
      <v-col v-for="movie in movies" :key="movie.imdbID" cols="12" sm="6" md="6" lg="4">
        <v-card class=" w-auto" :title="movie.Title">
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
defineProps({ movies: Array })
const emit = defineEmits(["movieId"])

function getId(id) {
  emit("movieId", id)
}

</script>
