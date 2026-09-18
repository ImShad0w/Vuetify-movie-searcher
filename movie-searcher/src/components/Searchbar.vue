<template>
  <v-text-field append-inner-icon="mdi-magnify" density="compact" label="Ex: Cyberpunk..." variant="solo" hide-details
    single-line v-model="movieSearch" @keydown.enter="search"></v-text-field>
</template>
<script setup>
import { ref } from "vue"
import { useApi } from "@/composables/communicationManager"

const { movies, getMovies } = useApi()
const movieSearch = ref("")
const isSearching = ref(false)

const emit = defineEmits(["movieData", "searching"])

async function search() {
  const query = movieSearch.value.trim()
  // Don't search when the input is empty or a request is already in flight
  if (!query || isSearching.value) return

  emit("searching")
  isSearching.value = true

  await getMovies(query)
  emit("movieData", movies.value)

  isSearching.value = false
  movieSearch.value = ""
}

</script>
