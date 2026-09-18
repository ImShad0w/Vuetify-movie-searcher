<template>
  <v-text-field append-inner-icon="mdi-magnify" density="compact" label="Ex: Cyberpunk..." variant="solo" hide-details
    single-line v-model="movieSearch" @keydown.enter="search"></v-text-field>
</template>
<script setup>
import { ref } from "vue"
import { useApi } from "@/composables/communicationManager"

const { movies, getMovies } = useApi()
const movieSearch = ref("")

const emit = defineEmits(["movieData"])

async function search() {
  await getMovies(movieSearch.value)
  emit("movieData", movies.value)
}

</script>
