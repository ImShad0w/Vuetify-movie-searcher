<template>
  <!-- No nested v-container: results share the single page alignment axis -->
  <section>
    <template v-if="!hasSearched">
      <v-alert rounded="lg" type="info" variant="tonal">
        Type a movie name above to see results.
      </v-alert>
    </template>

    <template v-else-if="loading">
      <div class="flex flex-col items-center justify-center gap-4 py-20">
        <v-progress-circular color="primary" indeterminate size="56" width="5" />
        <p class="text-sm text-slate-500">Searching for movies…</p>
      </div>
    </template>

    <template v-else-if="movies.length === 0">
      <v-alert rounded="lg" type="warning" variant="tonal">
        No movies found — try another search.
      </v-alert>
    </template>

    <template v-else>
      <h2 class="mb-4 text-xl font-semibold text-slate-900">
        Results
        <span class="font-normal text-slate-400">({{ movies.length }})</span>
      </h2>

      <v-row>
        <v-col
          v-for="movie in movies"
          :key="movie.imdbID"
          cols="12"
          lg="3"
          md="4"
          sm="6"
        >
          <!-- Repetition: every card uses the same surface, spacing and action treatment -->
          <v-card
            class="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 shadow-sm transition-shadow hover:shadow-lg"
            elevation="0"
          >
            <v-img
              class="bg-slate-200"
              cover
              height="320"
              :src="posterUrl(movie.Poster)"
            />

            <div class="flex flex-1 flex-col p-4">
              <h3 class="text-base font-semibold leading-snug text-slate-900">
                {{ movie.Title }}
              </h3>

              <p class="mt-1 text-xs font-medium tracking-wide text-slate-500 uppercase">
                {{ movie.Year }} · {{ movie.Type }}
              </p>
              <!-- Spacer keeps every CTA aligned to the bottom edge across cards -->
              <div class="flex-1" />

              <v-btn
                block
                class="mt-4"
                color="primary"
                variant="flat"
                @click="getId(movie.imdbID)"
              >
                View details
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </section>
</template>
<script setup>
import { posterUrl } from '@/utils/poster'

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
