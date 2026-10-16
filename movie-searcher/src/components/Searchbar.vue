<template>
  <!-- Proximity: the search control is grouped in its own elevated surface, clearly separated from results -->
  <section class="mb-8">
    <v-sheet class="rounded-xl pa-4 shadow-md" color="white">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
        <v-text-field
          v-model="movieSearch"
          class="flex-1"
          clearable
          density="comfortable"
          hide-details
          label="Search for a movie"
          placeholder="Ex: Cyberpunk..."
          prepend-inner-icon="mdi-magnify"
          rounded="lg"
          single-line
          variant="outlined"
          @keydown.enter="search"
        />

        <v-btn
          class="shrink-0"
          color="primary"
          :loading="isSearching"
          size="large"
          variant="flat"
          @click="search"
        >
          Search
        </v-btn>
      </div>
    </v-sheet>
  </section>
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
